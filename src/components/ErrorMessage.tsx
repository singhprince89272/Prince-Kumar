import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Unable to load news feed',
  message = 'We encountered an issue communicating with the news service. Please check your network connection or try again.',
  onRetry
}) => {
  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white/95 dark:bg-zinc-900/95 border border-rose-200 dark:border-rose-950/50 rounded-3xl text-center shadow-lg backdrop-blur-sm">
      <div className="w-14 h-14 mx-auto mb-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/20 shadow-2xs">
        <WifiOff className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
        {message}
      </p>
      {onRetry && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Now</span>
        </motion.button>
      )}
    </div>
  );
};

