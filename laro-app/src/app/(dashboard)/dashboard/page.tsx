'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, MapPin, Clock, Users, TrendingUp, Calendar } from 'lucide-react';
import { AuthenticatedHeader } from '@/components/layout/header';
import { Sidebar, MobileSidebar } from '@/components/layout/sidebar';
import { MobileBottomNav, MobileQuickAction } from '@/components/layout/mobile-nav';
import { GameButton, QuickMatchButton, FindCourtsButton, CreateTeamButton, JoinGameButton } from '@/components/ui/game-button';
import { StatCard, WinRateCard, GamesPlayedCard, RatingCard, StreakCard } from '@/components/ui/stat-card';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockUser = {
  username: 'CourtKing23',
  avatar: '',
  rating: 1847
};

const mockRecentGames = [
  {
    id: '1',
    opponent: 'Thunder Bolts',
    result: 'win',
    score: '78-65',
    ratingChange: +25,
    date: '2024-01-20',
    mvp: true
  },
  {
    id: '2',
    opponent: 'Street Warriors',
    result: 'loss',
    score: '82-89',
    ratingChange: -18,
    date: '2024-01-18',
    mvp: false
  },
  {
    id: '3',
    opponent: 'Hoop Dreams',
    result: 'win',
    score: '91-76',
    ratingChange: +22,
    date: '2024-01-15',
    mvp: true
  }
];

const mockUpcomingMatches = [
  {
    id: '1',
    opponent: 'City Ballers',
    date: 'Tomorrow',
    time: '6:00 PM',
    court: 'Downtown Basketball Court',
    distance: '0.8 miles'
  },
  {
    id: '2',
    opponent: 'Slam Dunkers',
    date: 'Friday',
    time: '7:30 PM',
    court: 'Riverside Park Court',
    distance: '1.2 miles'
  }
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <AuthenticatedHeader
            user={mockUser}
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
                Welcome back, <span className="text-primary-500">{mockUser.username}</span>! 🏀
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
                  <QuickMatchButton size="md" className="w-full" />
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
                  <FindCourtsButton size="md" className="w-full" />
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
                  <CreateTeamButton size="md" className="w-full" />
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
                  {mockRecentGames.map((game, index) => (
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
                          game.result === 'win' ? 'bg-court-500' : 'bg-red-500'
                        )} />
                        <div>
                          <p className="font-medium text-primary-100">
                            vs {game.opponent}
                          </p>
                          <p className="text-sm text-primary-300">
                            {game.score} • {game.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-bold font-accent",
                          game.ratingChange > 0 ? 'text-court-500' : 'text-red-400'
                        )}>
                          {game.ratingChange > 0 ? '+' : ''}{game.ratingChange}
                        </p>
                        {game.mvp && (
                          <p className="text-xs text-yellow-400">⭐ MVP</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
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
                  {mockUpcomingMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      className="p-4 bg-dark-200/50 rounded-lg border border-primary-400/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-primary-100">
                            vs {match.opponent}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-primary-300 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {match.date} {match.time}
                            </span>
                          </div>
                        </div>
                        <JoinGameButton />
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-primary-300">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.court}
                        </span>
                        <span className="text-court-400">{match.distance}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* No upcoming matches state */}
                  {mockUpcomingMatches.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏀</div>
                      <p className="text-primary-300 mb-4">No upcoming matches</p>
                      <QuickMatchButton size="sm" />
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
          games: 2,
          teams: 1
        }}
      />

      {/* Mobile Quick Action Button */}
      <MobileQuickAction />
    </div>
  );
}
