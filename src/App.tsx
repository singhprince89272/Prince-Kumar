import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NewsProvider, useNews } from './context/NewsContext';
import { ActivityProvider, useActivity } from './context/ActivityContext';
import { AuthPage } from './components/auth/AuthPage';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { ToastContainer } from './components/ToastContainer';
import { CuriosityPermissionModal } from './components/CuriosityPermissionModal';
import { ActivityDashboardModal } from './components/ActivityDashboardModal';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Search } from './pages/Search';
import { FollowingFeed } from './pages/FollowingFeed';
import { NewsDashboard } from './pages/NewsDashboard';
import { StockMarkets } from './pages/StockMarkets';
import { WeatherSection } from './pages/WeatherSection';
import { NewsTimeline } from './pages/NewsTimeline';
import { SourceComparison } from './pages/SourceComparison';
import { ArticleDetails } from './components/ArticleDetails';
import { BookmarksView } from './components/BookmarksView';
import { BeyondNews } from './components/BeyondNews';
import { NearYou } from './pages/NearYou';
import { NotFound } from './pages/NotFound';
import { Article } from './types';
import { Newspaper, Loader2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { view, selectedArticle, navigateToHome } = useNews();
  const { user, isEmailVerified, loading } = useAuth();
  const { 
    isCuriosityModalOpen, 
    setIsCuriosityModalOpen, 
    isActivityModalOpen, 
    setIsActivityModalOpen 
  } = useActivity();
  const [shareArticle, setShareArticle] = useState<Article | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = (article: Article) => {
    setShareArticle(article);
    setIsShareModalOpen(true);
  };

  const handleBackFromArticle = () => {
    navigateToHome();
  };

  // Loading spinner during auth state discovery
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center shadow-xl shadow-rose-600/30 animate-pulse">
            <Newspaper className="w-7 h-7" />
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400">
          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
          <span>Synchronizing NewsHub Session...</span>
        </div>
      </div>
    );
  }

  // If user is not signed in or email is not verified, show Auth Page
  if (!user || !isEmailVerified) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      {/* Large Decorative "NEWS" Background Watermark */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-100 flex flex-col justify-between">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-500/10 via-rose-500/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl rounded-full" />
        
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-full max-w-7xl flex items-center justify-between px-6">
          <span className="text-[12rem] sm:text-[18rem] lg:text-[24rem] font-black text-stroke-decorative tracking-tighter opacity-80 leading-none">
            NEWS
          </span>
        </div>
      </div>

      {/* Glass-like Sticky Navbar */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Category Navigation with Animated Tab Indicator */}
      {view !== 'article' && (
        <div className="relative z-30">
          <CategoryNav />
        </div>
      )}

      {/* Main Routed Content with Animated Page Entrance */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (selectedArticle ? selectedArticle.id : '')}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === 'home' && <Home onShare={handleShare} />}
            {view === 'category' && <Category onShare={handleShare} />}
            {view === 'search' && <Search onShare={handleShare} />}
            {view === 'following' && <FollowingFeed onShare={handleShare} />}
            {view === 'dashboard' && <NewsDashboard onShare={handleShare} />}
            {view === 'markets' && <StockMarkets onShare={handleShare} />}
            {view === 'weather' && <WeatherSection onShare={handleShare} />}
            {view === 'timeline' && <NewsTimeline />}
            {view === 'sources' && <SourceComparison />}
            {view === 'beyond-news' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BeyondNews isStandalonePage />
              </div>
            )}
            {view === 'near-you' && <NearYou />}
            {view === 'article' && selectedArticle && (
              <ArticleDetails
                article={selectedArticle}
                onBack={handleBackFromArticle}
                onShare={handleShare}
              />
            )}
            {view === 'bookmarks' && <BookmarksView onShare={handleShare} />}
            {view === '404' && <NotFound />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Global Share Modal */}
      <ShareModal
        article={shareArticle}
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setShareArticle(null);
        }}
      />

      {/* Curiosity Topics & Tracking Permission Modal */}
      <CuriosityPermissionModal
        isOpen={isCuriosityModalOpen}
        onClose={() => setIsCuriosityModalOpen(false)}
      />

      {/* Activity Insights & Privacy Management Dashboard */}
      <ActivityDashboardModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />

      {/* Floating Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <ActivityProvider>
          <MainApp />
        </ActivityProvider>
      </NewsProvider>
    </AuthProvider>
  );
}


