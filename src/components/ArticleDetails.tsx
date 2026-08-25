import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Copy, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Type, 
  Check, 
  RotateCcw,
  CheckCircle2,
  Newspaper,
  User,
  Radio
} from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';
import { useActivity } from '../context/ActivityContext';
import { getCategoryBadgeStyle, formatTimeAgo, NewsCard } from './NewsCard';
import { CATEGORY_PLACEHOLDERS, FALLBACK_ARTICLES } from '../data/fallbackNews';
import { CommentSection } from './CommentSection';
import { RelatedMarketWeatherWidget } from './beyond-news/RelatedMarketWeatherWidget';

interface ArticleDetailsProps {
  article: Article;
  onBack: () => void;
  onShare: (article: Article) => void;
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article, onBack, onShare }) => {
  const { toggleBookmark, isBookmarked, showToast, openArticle } = useNews();
  const { logActivity, getArticleCuriosityMatch } = useActivity();
  const bookmarked = isBookmarked(article.id);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const curiosityMatch = getArticleCuriosityMatch(article);

  // Text-To-Speech audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fallbackImage = CATEGORY_PLACEHOLDERS[article.category?.toLowerCase() || 'general'] || CATEGORY_PLACEHOLDERS.general;
  const displayImage = imageError || !article.urlToImage ? fallbackImage : article.urlToImage;

  // Log article read on mount
  useEffect(() => {
    logActivity('read_article', article.title, article.category, article.url);
  }, [article.id]);

  // Clean up speech synthesis on unmount or article change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Audio narration is not supported by your browser.', 'error');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel(); // reset any ongoing speech
      const textToRead = `${article.title}. Published by ${article.source.name}. ${article.description}. ${article.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      logActivity('listen_audio', article.title, article.category, article.url);
      showToast('Listening to article narration', 'info');
    }
  };

  const handleSpeedChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (isPlayingAudio && speechRef.current) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.description}. ${article.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = newRate;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyLink = () => {
    const url = article.url && article.url !== '#' ? article.url : window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('Article link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Related articles
  const relatedArticles = FALLBACK_ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || !article.category)
  ).slice(0, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </motion.button>

        <div className="flex items-center space-x-2">
          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl space-x-1 border border-zinc-200/60 dark:border-zinc-700/60">
            <button
              onClick={() => setFontSize('normal')}
              title="Standard Font Size"
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                fontSize === 'normal'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              title="Larger Font Size"
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                fontSize === 'large'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              A+
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleBookmark(article)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
              bookmarked
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-rose-600/10'
                : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900'
            }`}
            title={bookmarked ? 'Saved to bookmarks' : 'Save story'}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onShare(article)}
            className="p-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="Share article"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Header & Meta */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <span className={`text-xs font-black px-3 py-1 rounded-full border ${getCategoryBadgeStyle(article.category)} uppercase tracking-wider`}>
            {article.category || 'News'}
          </span>
          {article.isBreaking && (
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-600 text-white uppercase tracking-wider animate-pulse flex items-center space-x-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Breaking Story</span>
            </span>
          )}
          <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center font-bold">
            <Clock className="w-3.5 h-3.5 mr-1 text-rose-500" />
            {formatTimeAgo(article.publishedAt)}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center font-bold">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-rose-500" />
            {article.readTimeMinutes || 3} min read
          </span>
          {curiosityMatch.isMatch && (
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center space-x-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{curiosityMatch.matchedTopics.map(t => t.emoji + ' ' + t.label).join(' & ')} • {curiosityMatch.score}% Curiosity Match</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {article.description}
        </p>

        {/* Author Byline & Source Box */}
        <div className="flex items-center justify-between py-4 border-y border-zinc-200/80 dark:border-zinc-800/80 flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-rose-600/25">
              {article.source.name ? article.source.name.charAt(0) : 'N'}
            </div>
            <div>
              <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                {article.author ? article.author : article.source.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Published in <span className="font-bold text-zinc-800 dark:text-zinc-200">{article.source.name}</span> on {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Audio Player Bar */}
      <div className="my-6 p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleAudio}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-all cursor-pointer ${
              isPlayingAudio ? 'bg-zinc-900 hover:bg-zinc-800 shadow-zinc-900/30' : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-600/30'
            }`}
          >
            {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-rose-900 dark:text-rose-300 flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{isPlayingAudio ? 'Now Narrating Article' : 'Listen to this story'}</span>
            </p>
            <p className="text-xs text-rose-700/80 dark:text-rose-400/80 font-medium">
              AI text-to-speech audio reader with customizable speed
            </p>
          </div>
        </div>

        {/* Speed Controls & Wave animation */}
        <div className="flex items-center space-x-3 self-end sm:self-center">
          {isPlayingAudio && (
            <div className="flex items-center space-x-1 px-2">
              <span className="w-1 h-3 bg-rose-600 dark:bg-rose-400 animate-pulse rounded-full" />
              <span className="w-1 h-5 bg-rose-600 dark:bg-rose-400 animate-pulse delay-75 rounded-full" />
              <span className="w-1 h-2 bg-rose-600 dark:bg-rose-400 animate-pulse delay-150 rounded-full" />
            </div>
          )}

          <div className="flex items-center bg-white dark:bg-zinc-900 p-1 rounded-xl border border-rose-200/80 dark:border-rose-900/60 text-xs font-bold shadow-2xs">
            {[1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  speechRate === speed
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-rose-600'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Full Image */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-8 bg-zinc-100 dark:bg-zinc-800 shadow-lg border border-zinc-200/80 dark:border-zinc-800/80">
        <img
          src={displayImage}
          alt={article.title}
          onError={() => setImageError(true)}
          className="w-full max-h-[500px] object-cover"
        />
        <div className="p-3.5 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xs border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between font-bold">
          <span>Source: {article.source.name}</span>
          <span className="capitalize">Category: {article.category || 'General'}</span>
        </div>
      </div>

      {/* Key Takeaways Box */}
      {article.keyPoints && article.keyPoints.length > 0 && (
        <div className="p-6 rounded-2xl bg-zinc-50/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 mb-8 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Key Takeaways & Highlights</span>
          </div>
          <ul className="space-y-2.5">
            {article.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-snug font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body Content */}
      <div className={`prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 space-y-6 ${getFontSizeClass()}`}>
        {article.content ? (
          article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="leading-relaxed">
            {article.description}
          </p>
        )}

        {/* Pullquote for Editorial Polish */}
        <blockquote className="my-8 p-6 bg-gradient-to-r from-rose-50/80 to-red-50/30 dark:from-zinc-900 dark:to-zinc-800/80 border-l-4 border-rose-600 rounded-r-2xl text-zinc-800 dark:text-zinc-200 italic font-serif text-lg sm:text-xl shadow-xs">
          "{article.title}"
          <span className="block mt-2 text-xs font-sans not-italic font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            — {article.source.name} Editorial Wire
          </span>
        </blockquote>

        <p className="leading-relaxed font-normal">
          The full scope of this story continues to develop across regional newsrooms and official correspondent networks. Readers seeking verified source dispatches, documentation, and archival records can explore the verified coverage directly at the publisher portal.
        </p>
      </div>

      {/* Contextual Market & Weather Widget */}
      <RelatedMarketWeatherWidget article={article} />

      {/* Original Publisher Link Card */}
      <div className="mt-10 p-6 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-zinc-800/80">
        <div>
          <h4 className="text-base font-black mb-1">
            Read Full Original Story
          </h4>
          <p className="text-xs text-zinc-400">
            Continue reading full unabridged coverage on {article.source.name}
          </p>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 transition-all shrink-0 cursor-pointer"
        >
          <span>Visit {article.source.name}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Community Comments Section */}
      <CommentSection articleId={article.id} articleTitle={article.title} />

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="mt-16 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center space-x-2 mb-6">
            <Newspaper className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              Related Stories
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <NewsCard key={rel.id} article={rel} onShare={onShare} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
