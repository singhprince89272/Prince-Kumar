import React from 'react';
import { Newspaper, Home, ArrowLeft } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const NotFound: React.FC = () => {
  const { navigateToHome } = useNews();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center shadow-xs">
        <Newspaper className="w-10 h-10" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">
        Page or Story Not Found
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
        The article or desk you were looking for might have been relocated, archived, or is temporarily unavailable.
      </p>
      <button
        onClick={navigateToHome}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Headlines</span>
      </button>
    </div>
  );
};
