import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Flag, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Pin,
  CornerDownRight,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';
import { ArticleComment, CommentReply } from '../types';
import { INITIAL_COMMENTS } from '../data/commentsData';
import { useAuth } from '../context/AuthContext';
import { useNews } from '../context/NewsContext';

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId, articleTitle }) => {
  const { user } = useAuth();
  const { showToast } = useNews();

  // Storage key per article
  const storageKey = `newshub_comments_${articleId}`;

  const [comments, setComments] = useState<ArticleComment[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse comments', e);
      }
    }
    return INITIAL_COMMENTS[articleId] || INITIAL_COMMENTS['default'] || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch (e) {
      console.error('Failed to save comments', e);
    }
  }, [comments, storageKey]);

  // Form states
  const [newCommentText, setNewCommentText] = useState('');
  const [authorNameInput, setAuthorNameInput] = useState(user?.displayName || 'Anonymous Reader');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');

  // Reporting modal state
  const [reportingComment, setReportingComment] = useState<{ id: string; isReply?: boolean; commentId?: string } | null>(null);
  const [reportReason, setReportReason] = useState<string>('spam');
  const [reportDetails, setReportDetails] = useState<string>('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newCommentText.trim();
    if (!text) return;

    const newComment: ArticleComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      articleId,
      authorId: user?.uid || 'guest-user',
      authorName: user?.displayName || authorNameInput.trim() || 'Reader',
      authorAvatar: user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.displayName || authorNameInput || 'guest'}`,
      content: text,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      userReaction: null,
      replies: []
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText('');
    showToast('Your comment has been posted!', 'success');
  };

  const handleAddReply = (commentId: string) => {
    const text = replyText.trim();
    if (!text) return;

    const newReply: CommentReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      commentId,
      authorId: user?.uid || 'guest-user',
      authorName: user?.displayName || authorNameInput.trim() || 'Reader',
      authorAvatar: user?.photoURL || `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.displayName || authorNameInput || 'reply'}`,
      content: text,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      userReaction: null
    };

    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply]
          };
        }
        return c;
      })
    );

    setReplyText('');
    setReplyingToId(null);
    showToast('Reply published successfully', 'success');
  };

  const handleReaction = (commentId: string, type: 'like' | 'dislike', isReply = false, replyId?: string) => {
    setComments(prev =>
      prev.map(comment => {
        if (isReply && comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map(r => {
              if (r.id === replyId) {
                const current = r.userReaction;
                let newLikes = r.likes;
                let newDislikes = r.dislikes;
                let newReaction: 'like' | 'dislike' | null = type;

                if (current === type) {
                  // Toggle off
                  newReaction = null;
                  if (type === 'like') newLikes = Math.max(0, newLikes - 1);
                  if (type === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
                } else {
                  if (current === 'like') newLikes = Math.max(0, newLikes - 1);
                  if (current === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
                  if (type === 'like') newLikes += 1;
                  if (type === 'dislike') newDislikes += 1;
                }

                return {
                  ...r,
                  likes: newLikes,
                  dislikes: newDislikes,
                  userReaction: newReaction
                };
              }
              return r;
            })
          };
        }

        if (!isReply && comment.id === commentId) {
          const current = comment.userReaction;
          let newLikes = comment.likes;
          let newDislikes = comment.dislikes;
          let newReaction: 'like' | 'dislike' | null = type;

          if (current === type) {
            newReaction = null;
            if (type === 'like') newLikes = Math.max(0, newLikes - 1);
            if (type === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
          } else {
            if (current === 'like') newLikes = Math.max(0, newLikes - 1);
            if (current === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
            if (type === 'like') newLikes += 1;
            if (type === 'dislike') newDislikes += 1;
          }

          return {
            ...comment,
            likes: newLikes,
            dislikes: newDislikes,
            userReaction: newReaction
          };
        }

        return comment;
      })
    );
  };

  const submitReport = () => {
    if (!reportingComment) return;
    showToast('Report submitted for moderation review. Thank you.', 'info');
    setReportingComment(null);
    setReportReason('spam');
    setReportDetails('');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (sortBy === 'top') {
      return (b.likes - b.dislikes) - (a.likes - a.dislikes);
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const totalDiscussionCount = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  return (
    <section id="article-comments-section" className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20 shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Community Discussion
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {totalDiscussionCount} contributions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Join the conversation on "{articleTitle.substring(0, 60)}..."
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 self-start sm:self-center bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-bold">
          <button
            onClick={() => setSortBy('top')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              sortBy === 'top'
                ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            🔥 Top Reactions
          </button>
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              sortBy === 'newest'
                ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            ⏱️ Newest First
          </button>
        </div>
      </div>

      {/* Write Comment Box */}
      <form onSubmit={handleAddComment} className="mb-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">
              {user ? (
                <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                  <span>{user.displayName || user.email}</span>
                  <ShieldCheck className="w-3.5 h-3.5 inline" />
                </span>
              ) : (
                <input
                  type="text"
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                  placeholder="Your Name (e.g. Maya Patel)"
                  className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-lg px-2.5 py-1 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-rose-500"
                />
              )}
            </span>
            <span className="text-2xs text-zinc-400">
              Be respectful and adhere to journalistic discussion standards.
            </span>
          </div>
        </div>

        <textarea
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Share your perspective, context, or ask a question about this story..."
          className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none"
        />

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="text-2xs text-zinc-400">
            {newCommentText.length}/500 characters
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={!newCommentText.trim()}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm shadow-rose-600/20 cursor-pointer transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Comment</span>
          </motion.button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/40 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <MessageSquare className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              No comments yet
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Be the first to share your thoughts on this story!
            </p>
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-2xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={comment.authorAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${comment.authorName}`}
                    alt={comment.authorName}
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">
                        {comment.authorName}
                      </span>
                      {comment.isPinned && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-2xs font-black bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Pin className="w-2.5 h-2.5" />
                          <span>Pinned Insight</span>
                        </span>
                      )}
                    </div>
                    <span className="text-2xs text-zinc-400">
                      {new Date(comment.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Report button */}
                <button
                  onClick={() => setReportingComment({ id: comment.id })}
                  title="Report Comment"
                  className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Comment Content */}
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-11 mb-3">
                {comment.content}
              </p>

              {/* Action Buttons: Like, Dislike, Reply */}
              <div className="flex items-center space-x-3 pl-11 text-xs">
                {/* Like */}
                <button
                  onClick={() => handleReaction(comment.id, 'like')}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    comment.userReaction === 'like'
                      ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{comment.likes}</span>
                </button>

                {/* Dislike */}
                <button
                  onClick={() => handleReaction(comment.id, 'dislike')}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    comment.userReaction === 'dislike'
                      ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{comment.dislikes}</span>
                </button>

                {/* Reply */}
                <button
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer font-bold"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply {comment.replies.length > 0 && `(${comment.replies.length})`}</span>
                </button>
              </div>

              {/* Reply Input Box */}
              {replyingToId === comment.id && (
                <div className="mt-3 pl-11 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.authorName}...`}
                      className="flex-1 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-rose-500"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                    >
                      Send
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Nested Replies Thread */}
              {comment.replies.length > 0 && (
                <div className="mt-3 pl-11 space-y-2.5 border-l-2 border-zinc-100 dark:border-zinc-800 ml-4 pt-1">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-zinc-50/80 dark:bg-zinc-950/40 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800/60"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-2">
                          <CornerDownRight className="w-3 h-3 text-zinc-400" />
                          <img
                            src={reply.authorAvatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${reply.authorName}`}
                            alt={reply.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">
                            {reply.authorName}
                          </span>
                          <span className="text-2xs text-zinc-400">
                            {new Date(reply.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <button
                          onClick={() => setReportingComment({ id: reply.id, isReply: true, commentId: comment.id })}
                          title="Report Reply"
                          className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-xs text-zinc-700 dark:text-zinc-300 pl-5 mb-2">
                        {reply.content}
                      </p>

                      <div className="flex items-center space-x-2 pl-5 text-2xs">
                        <button
                          onClick={() => handleReaction(comment.id, 'like', true, reply.id)}
                          className={`flex items-center space-x-1 px-2 py-0.5 rounded cursor-pointer ${
                            reply.userReaction === 'like'
                              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{reply.likes}</span>
                        </button>
                        <button
                          onClick={() => handleReaction(comment.id, 'dislike', true, reply.id)}
                          className={`flex items-center space-x-1 px-2 py-0.5 rounded cursor-pointer ${
                            reply.userReaction === 'dislike'
                              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 font-bold'
                              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>{reply.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportingComment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-base">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Report Comment</span>
                </div>
                <button
                  onClick={() => setReportingComment(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs sm:text-sm">
                <p className="text-zinc-600 dark:text-zinc-300">
                  Please select the issue regarding this contribution:
                </p>

                <div className="space-y-2">
                  {[
                    { id: 'spam', label: 'Commercial Spam or Bot Activity' },
                    { id: 'harassment', label: 'Harassment, Hate Speech or Threats' },
                    { id: 'misinfo', label: 'Factually Misleading or Dangerous Misinformation' },
                    { id: 'inappropriate', label: 'Explicit or Inappropriate Content' },
                    { id: 'other', label: 'Other violation of Community Guidelines' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="report_reason"
                        checked={reportReason === item.id}
                        onChange={() => setReportReason(item.id)}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-zinc-400 mb-1">
                    Optional Details
                  </label>
                  <textarea
                    rows={2}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide additional context for moderation team..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => setReportingComment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={submitReport}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-rose-600/20 cursor-pointer"
                >
                  Submit Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
