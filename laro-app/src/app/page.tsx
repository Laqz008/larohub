'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Calendar, Trophy } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { GameButton, QuickMatchButton, FindCourtsButton, CreateTeamButton } from '@/components/ui/game-button';
import { StatCard } from '@/components/ui/stat-card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Basketball court background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="court-lines w-full h-full" />
        </div>

        {/* Animated basketball */}
        <motion.div
          className="absolute top-20 right-10 text-6xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏀
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main headline */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Find Your Game,
              </span>
              <br />
              <span className="text-white">
                Build Your Legacy
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-primary-200 mb-12 max-w-3xl mx-auto font-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connect with basketball players, discover courts, build teams, and compete in the ultimate basketball matchmaking platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <QuickMatchButton
                size="lg"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              />
              <GameButton
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Watch Demo
              </GameButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <StatCard
                title="Active Players"
                value="2,847"
                icon={<Users className="w-6 h-6" />}
                size="sm"
                animated
              />
              <StatCard
                title="Courts Listed"
                value="156"
                icon={<MapPin className="w-6 h-6" />}
                size="sm"
                animated
              />
              <StatCard
                title="Games Played"
                value="12,493"
                icon={<Trophy className="w-6 h-6" />}
                size="sm"
                animated
              />
              <StatCard
                title="Teams Formed"
                value="892"
                icon={<Calendar className="w-6 h-6" />}
                size="sm"
                animated
              />
            </motion.div>
          </div>
        </div>

        {/* Court gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Everything You Need to
              <span className="text-primary-500"> Dominate the Court</span>
            </h2>
            <p className="text-lg text-primary-200 max-w-2xl mx-auto">
              From finding the perfect match to building championship teams, LARO has all the tools you need.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Matchmaking */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Smart Matchmaking</h3>
              <p className="text-primary-200 mb-6">
                Our AI-powered algorithm matches you with players and teams based on skill level, location, and playing style.
              </p>
              <QuickMatchButton size="sm" />
            </motion.div>

            {/* Court Discovery */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Court Discovery</h3>
              <p className="text-primary-200 mb-6">
                Find and explore basketball courts near you with real-time availability, ratings, and amenities.
              </p>
              <FindCourtsButton size="sm" />
            </motion.div>

            {/* Team Building */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Team Building</h3>
              <p className="text-primary-200 mb-6">
                Create and manage teams with advanced lineup tools, player statistics, and team chemistry analysis.
              </p>
              <CreateTeamButton size="sm" />
            </motion.div>

            {/* Real-time Scheduling */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Real-time Scheduling</h3>
              <p className="text-primary-200 mb-6">
                Schedule games instantly with automatic notifications, calendar integration, and weather updates.
              </p>
              <GameButton variant="secondary" size="sm">
                Schedule Game
              </GameButton>
            </motion.div>

            {/* Achievement System */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Achievement System</h3>
              <p className="text-primary-200 mb-6">
                Unlock badges, climb leaderboards, and track your basketball journey with detailed statistics.
              </p>
              <GameButton variant="success" size="sm">
                View Achievements
              </GameButton>
            </motion.div>

            {/* Community Features */}
            <motion.div
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-xl p-8 border border-primary-400/20 hover:border-primary-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Community Features</h3>
              <p className="text-primary-200 mb-6">
                Connect with the basketball community through chat, forums, and social features.
              </p>
              <GameButton variant="ghost" size="sm">
                Join Community
              </GameButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-court-600/20" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Take Your Game to the Next Level?
            </h2>
            <p className="text-lg text-primary-200 mb-8">
              Join thousands of basketball players already using LARO to find games, build teams, and improve their skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GameButton
                variant="primary"
                size="lg"
                glow
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Get Started Free
              </GameButton>
              <GameButton
                variant="secondary"
                size="lg"
              >
                Learn More
              </GameButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-400 border-t border-primary-400/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🏀</span>
              </div>
              <span className="text-xl font-display font-bold text-primary-400">LARO</span>
            </div>
            <p className="text-primary-300 text-sm">
              © 2024 LARO. All rights reserved. Find Your Game, Build Your Legacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
