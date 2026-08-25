import { ArticleComment } from '../types';

export const INITIAL_COMMENTS: Record<string, ArticleComment[]> = {
  default: [
    {
      id: 'comment-seed-1',
      articleId: 'default',
      authorId: 'user-expert-1',
      authorName: 'Dr. Arjun Mehta',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      content: 'The architectural shift toward test-time reasoning and decentralized compute is groundbreaking. Especially the verifiable safety checkpoints outlined in the accords.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      likes: 18,
      dislikes: 1,
      userReaction: null,
      isPinned: true,
      replies: [
        {
          id: 'reply-1',
          commentId: 'comment-seed-1',
          authorId: 'user-tech-2',
          authorName: 'Sarah Jenkins',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
          content: 'Agreed Dr. Mehta! The key hurdle now is whether smaller open-source research labs can access sufficient compute without regulatory bottlenecks.',
          timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
          likes: 7,
          dislikes: 0,
          userReaction: null
        }
      ]
    },
    {
      id: 'comment-seed-2',
      articleId: 'default',
      authorId: 'user-fin-3',
      authorName: 'Vikram Singhania',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      content: 'Remarkable momentum in the domestic markets as well. The macroeconomic indicators are finally reflecting healthy industrial earnings growth.',
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      likes: 12,
      dislikes: 0,
      userReaction: null,
      replies: []
    }
  ]
};
