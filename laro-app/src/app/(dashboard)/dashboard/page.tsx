'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, MapPin, Calendar } from 'lucide-react';
import { AuthenticatedHeader } from '@/components/layout/header';
import { Sidebar, MobileSidebar } from '@/components/layout/sidebar';
import { MobileBottomNav, MobileQuickAction } from '@/components/layout/mobile-nav';
import { GameButton, QuickMatchButton, FindCourtsButton, CreateTeamButton, JoinGameButton } from '@/components/ui/game-button';
import { WinRateCard, GamesPlayedCard, RatingCard, StreakCard } from '@/components/ui/stat-card';
import { DashboardSkeleton } from '@/components/ui/skeleton';
import { PageErrorBoundary } from '@/components/error/error-boundary';
import { cn } from '@/lib/utils';
import { useCurrentUser, useGames } from '@/lib/hooks/use-api';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useSocket } from '@/lib/realtime/socket';
import { MockLogin } from '@/components/auth/mock-login';

function DashboardPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Get current user data
  const { data: currentUserResponse, isLoading: userLoading } = useCurrentUser();
  const user = currentUserResponse?.data;

  // Get recent games (user's game history)
  const { data: recentGamesResponse, isLoading: gamesLoading } = useGames(
    { status: 'completed' },
    1,
    5
  );
  const recentGames = recentGamesResponse?.data?.data || [];

  // Get upcoming games
  const { data: upcomingGamesResponse, isLoading: upcomingLoading } = useGames(
    { status: 'open' },
    1,
    5
  );
  const upcomingGames = upcomingGamesResponse?.data?.data || [];

  // Initialize auth and socket connection
  const { initializeAuth, isAuthenticated } = useAuthStore();
  const { connect: connectSocket } = useSocket();

  useEffect(() => {
    // Initialize authentication on component mount
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Connect to socket when user is authenticated
    if (user) {
      connectSocket().catch(console.error);
    }
  }, [user, connectSocket]);

  const isLoading = userLoading || gamesLoading || upcomingLoading;

  // Show login screen if not authenticated
  if (!isAuthenticated && !userLoading) {
    return <MockLogin />;
  }

  // Show loading skeleton while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="flex">
          <div className="hidden lg:block">
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              notifications={{
                games: { count: 2, type: 'info', label: 'New game invitations' },
                teams: { count: 1, type: 'warning', label: 'Team roster update needed' },
                achievements: { count: 3, type: 'success', label: 'New achievements unlocked!' },
                profile: { count: 1, type: 'urgent', label: 'Profile verification required' }
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <AuthenticatedHeader
              user={user || { username: 'Loading...', avatar: '', rating: 0 }}
              onMenuToggle={() => setMobileSidebarOpen(true)}
            />
            <DashboardSkeleton />
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            notifications={{
              games: { count: 2, type: 'info', label: 'New game invitations' },
              teams: { count: 1, type: 'warning', label: 'Team roster update needed' },
              achievements: { count: 3, type: 'success', label: 'New achievements unlocked!' },
              profile: { count: 1, type: 'urgent', label: 'Profile verification required' }
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <AuthenticatedHeader
            user={user || { username: 'Loading...', avatar: '', rating: 0 }}
            onMenuToggle={() => setMobileSidebarOpen(true)}
          />

          {/* Dashboard Content */}
          <main className="p-4 lg:p-8">
            {/* Welcome Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                Welcome back, <span className="text-primary-500">{user?.username || 'Player'}</span>! 🏀
              </h1>
              <p className="text-primary-200 text-lg">
                Ready to dominate the court today?
              </p>
            </motion.div>

            {/* Quick Action Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Quick Match Card */}
              <motion.div
                className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl p-6 border border-primary-400/30 relative overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 right-0 text-6xl opacity-10">⚡</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-2">Quick Match</h3>
                  <p className="text-primary-200 mb-4 text-sm">
                    Find a game near you in seconds
                  </p>
                  <QuickMatchButton size="md" className="w-full">Quick Match</QuickMatchButton>
                </div>
              </motion.div>

              {/* Find Courts Card */}
              <motion.div
                className="bg-gradient-to-br from-court-500/20 to-court-600/20 rounded-xl p-6 border border-court-400/30 relative overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 right-0 text-6xl opacity-10">🗺️</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-2">Find Courts</h3>
                  <p className="text-primary-200 mb-4 text-sm">
                    Discover courts with real-time availability
                  </p>
                  <FindCourtsButton size="md" className="w-full">Find Courts</FindCourtsButton>
                </div>
              </motion.div>

              {/* Create Team Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-400/30 relative overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 right-0 text-6xl opacity-10">👥</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-2">Create Team</h3>
                  <p className="text-primary-200 mb-4 text-sm">
                    Build your championship squad
                  </p>
                  <CreateTeamButton size="md" className="w-full">Create Team</CreateTeamButton>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GamesPlayedCard
                games={127}
                trend={{ direction: 'up', value: 12, label: 'this month' }}
              />
              <WinRateCard
                winRate={74}
                trend={{ direction: 'up', value: 5, label: 'this week' }}
              />
              <RatingCard
                rating={1847}
                trend={{ direction: 'up', value: 3, label: 'this week' }}
              />
              <StreakCard
                streak={5}
                trend={{ direction: 'up', value: 25, label: 'best: 12' }}
              />
            </motion.div>

            {/* Recent Games & Upcoming Matches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Games */}
              <motion.div
                className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl p-6 border border-primary-400/20"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-white">Recent Games</h2>
                  <GameButton variant="ghost" size="sm">
                    View All
                  </GameButton>
                </div>

                <div className="space-y-4">
                  {recentGames.length > 0 ? recentGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      className="flex items-center justify-between p-4 bg-dark-200/50 rounded-lg border border-primary-400/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          game.winnerTeamId ? 'bg-court-500' : 'bg-red-500'
                        )} />
                        <div>
                          <p className="font-medium text-primary-100">
                            vs {game.opponentTeam?.name || 'Unknown Team'}
                          </p>
                          <p className="text-sm text-primary-300">
                            {game.hostScore || 0}-{game.opponentScore || 0} • {new Date(game.scheduledTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-bold font-accent",
                          game.winnerTeamId ? 'text-court-500' : 'text-red-400'
                        )}>
                          {game.winnerTeamId ? 'W' : 'L'}
                        </p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏀</div>
                      <p className="text-primary-300">No recent games</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Upcoming Matches */}
              <motion.div
                className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl p-6 border border-primary-400/20"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-white">Upcoming Matches</h2>
                  <GameButton variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Schedule
                  </GameButton>
                </div>

                <div className="space-y-4">
                  {upcomingGames.length > 0 ? upcomingGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      className="p-4 bg-dark-200/50 rounded-lg border border-primary-400/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-primary-100">
                            vs {game.opponentTeam?.name || 'Open Game'}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-primary-300 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(game.scheduledTime).toLocaleDateString()} {new Date(game.scheduledTime).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <JoinGameButton>Join</JoinGameButton>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-primary-300">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {game.court?.name || 'Court TBD'}
                        </span>
                        <span className="text-court-400">{game.gameType}</span>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏀</div>
                      <p className="text-primary-300 mb-4">No upcoming matches</p>
                      <QuickMatchButton size="sm">Find Game</QuickMatchButton>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav
        notifications={{
          games: { count: 2, type: 'info', label: 'New game invitations' },
          teams: { count: 1, type: 'warning', label: 'Team roster update needed' },
          achievements: { count: 3, type: 'success', label: 'New achievements unlocked!' },
          profile: { count: 1, type: 'urgent', label: 'Profile verification required' }
        }}
      />

      {/* Mobile Quick Action Button */}
      <MobileQuickAction />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageErrorBoundary>
      <DashboardPageContent />
    </PageErrorBoundary>
  );
}
