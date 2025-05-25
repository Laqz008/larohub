'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2, MapPin, BarChart3, Users, Calendar, Trophy } from 'lucide-react';

// Lazy load heavy components
export const LazyCourtMap = lazy(() => 
  import('@/components/maps/court-map').then(module => ({ 
    default: module.CourtMap 
  }))
);

export const LazyPlayerStatsDashboard = lazy(() => 
  import('@/components/stats/player-stats-dashboard').then(module => ({ 
    default: module.PlayerStatsDashboard 
  }))
);

export const LazyGameChat = lazy(() => 
  import('@/components/game/game-chat').then(module => ({ 
    default: module.GameChat 
  }))
);

export const LazyCourtBookingCalendar = lazy(() => 
  import('@/components/courts/court-booking-calendar').then(module => ({ 
    default: module.CourtBookingCalendar 
  }))
);

export const LazyGameForm = lazy(() => 
  import('@/components/forms/game-form').then(module => ({ 
    default: module.GameForm 
  }))
);

export const LazyTeamForm = lazy(() => 
  import('@/components/forms/team-form').then(module => ({ 
    default: module.TeamForm 
  }))
);

export const LazyGameCompletionForm = lazy(() => 
  import('@/components/games/game-completion-form').then(module => ({ 
    default: module.GameCompletionForm 
  }))
);

export const LazyFeatureShowcase = lazy(() => 
  import('@/components/features/feature-showcase').then(module => ({ 
    default: module.FeatureShowcase 
  }))
);

// Basketball-themed loading components
export function CourtMapSkeleton() {
  return (
    <div className="h-96 lg:h-[500px] bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl border border-primary-400/20 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Court pattern background */}
        <div className="absolute inset-0 bg-gradient-to-br from-court-600/20 via-court-500/20 to-court-400/20" />
        
        {/* Loading animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <MapPin className="w-12 h-12 text-primary-400" />
              <motion.div
                className="absolute inset-0 w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="text-center">
              <p className="text-primary-200 font-medium">Loading court map...</p>
              <p className="text-primary-400 text-sm">Finding nearby basketball courts</p>
            </div>
          </motion.div>
        </div>

        {/* Skeleton markers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-primary-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PlayerStatsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary-400/20 rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-32 bg-primary-400/20 rounded animate-pulse" />
          <div className="h-4 w-48 bg-primary-400/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl p-6 border border-primary-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-6 h-6 text-primary-400/50" />
              <div className="w-8 h-8 bg-primary-400/20 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-16 bg-primary-400/20 rounded animate-pulse" />
              <div className="h-4 w-20 bg-primary-400/20 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading message */}
      <div className="text-center py-8">
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="w-6 h-6 text-primary-400" />
          <span className="text-primary-200">Loading player statistics...</span>
          <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
        </motion.div>
      </div>
    </div>
  );
}

export function GameChatSkeleton() {
  return (
    <div className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl border border-primary-400/20 p-4 h-96">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-5 h-5 text-primary-400" />
        <div className="h-5 w-24 bg-primary-400/20 rounded animate-pulse" />
      </div>
      
      <div className="space-y-3 mb-4 flex-1 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-400/20 rounded-full animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-20 bg-primary-400/20 rounded animate-pulse" />
              <div className="h-4 w-full bg-primary-400/20 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-primary-400 text-sm">
        Loading game chat...
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl border border-primary-400/20 p-6">
      <div className="space-y-6">
        <div className="h-6 w-32 bg-primary-400/20 rounded animate-pulse" />
        
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-primary-400/20 rounded animate-pulse" />
            <div className="h-10 w-full bg-primary-400/20 rounded animate-pulse" />
          </div>
        ))}

        <div className="flex space-x-3 pt-4">
          <div className="h-10 w-24 bg-primary-400/20 rounded animate-pulse" />
          <div className="h-10 w-24 bg-primary-400/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="bg-gradient-to-br from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl border border-primary-400/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-primary-400/20 rounded animate-pulse" />
        <Calendar className="w-6 h-6 text-primary-400" />
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-8 bg-primary-400/20 rounded animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="h-10 bg-primary-400/10 rounded animate-pulse" />
        ))}
      </div>

      <div className="text-center text-primary-400 text-sm mt-4">
        Loading availability calendar...
      </div>
    </div>
  );
}

// Generic loading wrapper component
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback || <div className={className}>Loading...</div>}>
      {children}
    </Suspense>
  );
}
