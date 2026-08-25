import React from 'react';

export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col h-full animate-shimmer relative">
      <div className="w-full h-52 bg-zinc-200/80 dark:bg-zinc-800/80" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-6 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="space-y-2 pt-1">
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
            <div className="h-4 w-3/4 bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
          </div>
        </div>
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          <div className="h-4 w-16 bg-rose-200/50 dark:bg-rose-950/40 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const FeaturedSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
      <div className="lg:col-span-8 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-3xl h-[420px] lg:h-[480px] animate-shimmer relative overflow-hidden" />
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <div className="h-7 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-shimmer" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl flex-1 flex space-x-3 animate-shimmer relative overflow-hidden">
            <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArticleDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-shimmer relative">
      <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      <div className="space-y-3">
        <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>
      <div className="flex items-center space-x-4 border-y border-zinc-200 dark:border-zinc-800 py-4">
        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-3 w-48 bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
        </div>
      </div>
      <div className="w-full h-96 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
      <div className="space-y-4 pt-4">
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-5 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-5 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
      </div>
    </div>
  );
};

