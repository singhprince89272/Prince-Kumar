import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Globe, Send, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';

interface ShareModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ article, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useNews();

  if (!isOpen || !article) return null;

  const shareUrl = article.url && article.url !== '#' ? article.url : window.location.href;
  const shareTitle = article.title;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Article link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-zinc-950/20',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-sky-700 hover:bg-sky-600 text-white shadow-sky-700/20',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-2xs">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">Share Story</h3>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="py-4">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-4 leading-snug">
              {article.title}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {shareOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    key={opt.name}
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold shadow-sm transition-all ${opt.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.name}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Article Link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 select-all outline-none"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/25'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

