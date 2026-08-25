import React from 'react';
import { Article, ViewLayout } from '../types';
import { NewsCard } from './NewsCard';
import { NewsCardSkeleton } from './Loader';
import { Newspaper } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  loading?: boolean;
  layout?: ViewLayout;
  onShare?: (article: Article) => void;
  emptyTitle?: string;
  emptySubtitle?: string;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  loading = false,
  layout = 'grid',
  onShare,
  emptyTitle = 'No stories found',
  emptySubtitle = 'Try switching categories, clearing search filters, or checking back shortly.'
}) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${
        layout === 'compact'
          ? 'grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <NewsCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl my-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
          <Newspaper className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          {emptyTitle}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          {emptySubtitle}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      layout === 'compact'
        ? 'grid-cols-1'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          layout={layout}
          onShare={onShare}
        />
      ))}
    </div>
  );
};
