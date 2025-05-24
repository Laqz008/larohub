'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthenticatedHeader } from '@/components/layout/header';
import { Sidebar, MobileSidebar } from '@/components/layout/sidebar';
import { MobileBottomNav, MobileQuickAction } from '@/components/layout/mobile-nav';
import { GameButton } from '@/components/ui/game-button';
import { GameCreationForm } from '@/components/forms/game-form';
import { GameForm, Court } from '@/types';

const mockUser = {
  username: 'CourtKing23',
  avatar: '',
  rating: 1847
};

// Mock courts data
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Venice Beach Basketball Courts',
    address: '1800 Ocean Front Walk, Venice, CA 90291',
    latitude: 33.9850,
    longitude: -118.4695,
    courtType: 'outdoor',
    surfaceType: 'Asphalt',
    hasLighting: true,
    hasParking: true,
    rating: 4.5,
    reviewCount: 127,
    isVerified: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Downtown Athletic Club',
    address: '123 S Figueroa St, Los Angeles, CA 90015',
    latitude: 34.0522,
    longitude: -118.2437,
    courtType: 'indoor',
    surfaceType: 'Hardwood',
    hasLighting: true,
    hasParking: true,
    rating: 4.8,
    reviewCount: 89,
    isVerified: true,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Griffith Park Courts',
    address: '4730 Crystal Springs Dr, Los Angeles, CA 90027',
    latitude: 34.1365,
    longitude: -118.2940,
    courtType: 'outdoor',
    surfaceType: 'Concrete',
    hasLighting: false,
    hasParking: true,
    rating: 4.2,
    reviewCount: 156,
    isVerified: false,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'UCLA Recreation Center',
    address: '221 Westwood Plaza, Los Angeles, CA 90095',
    latitude: 34.0689,
    longitude: -118.4452,
    courtType: 'indoor',
    surfaceType: 'Hardwood',
    hasLighting: true,
    hasParking: true,
    rating: 4.7,
    reviewCount: 67,
    isVerified: true,
    createdAt: new Date('2024-02-05')
  }
];

export default function CreateGamePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: GameForm) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Creating game:', formData);
      
      // Show success state
      setIsSuccess(true);
      
      // Redirect to game page after success
      setTimeout(() => {
        router.push('/games/new-game-id'); // In real app, use actual game ID
      }, 2000);
      
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 bg-court-500 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(34, 139, 34, 0.5)',
                '0 0 40px rgba(34, 139, 34, 0.8)',
                '0 0 20px rgba(34, 139, 34, 0.5)'
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Game Created Successfully! 🏀
          </h1>
          
          <p className="text-primary-200 text-lg mb-6">
            Your game is live and players can now join. Get ready to ball!
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-primary-300">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
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
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <AuthenticatedHeader 
            user={mockUser}
            onMenuToggle={() => setMobileSidebarOpen(true)}
          />

          {/* Page Content */}
          <main className="p-4 lg:p-8">
            {/* Back Button */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GameButton
                variant="ghost"
                size="md"
                onClick={handleCancel}
                icon={<ArrowLeft className="w-5 h-5" />}
              >
                Back to Games
              </GameButton>
            </motion.div>

            {/* Page Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Create Your <span className="text-primary-500">Basketball Game</span> 🏀
              </h1>
              <p className="text-xl text-primary-200 max-w-2xl mx-auto">
                Organize a game, invite players, and get ready to dominate the court
              </p>
            </motion.div>

            {/* Animated basketballs */}
            <div className="relative">
              <motion.div
                className="absolute top-10 left-10 text-4xl opacity-20"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏀
              </motion.div>
              
              <motion.div
                className="absolute top-20 right-20 text-3xl opacity-20"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🏀
              </motion.div>

              {/* Game Creation Form */}
              <motion.div
                className="max-w-4xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GameCreationForm
                  courts={mockCourts}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>

            {/* Tips Section */}
            <motion.div
              className="max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-primary-500/10 to-court-500/10 rounded-xl p-6 border border-primary-400/20">
                <h3 className="text-lg font-display font-bold text-white mb-4 text-center">
                  💡 Tips for Organizing Great Games
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⏰</span>
                    </div>
                    <h4 className="font-bold text-primary-100 mb-2">Perfect Timing</h4>
                    <p className="text-sm text-primary-300">
                      Schedule games during peak hours (evenings and weekends) for maximum participation.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-court-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-bold text-primary-100 mb-2">Skill Balance</h4>
                    <p className="text-sm text-primary-300">
                      Set appropriate skill level ranges to ensure competitive and fun games for everyone.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h4 className="font-bold text-primary-100 mb-2">Great Locations</h4>
                    <p className="text-sm text-primary-300">
                      Choose courts with good lighting, parking, and amenities for the best experience.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav 
        notifications={{
          games: 3
        }}
      />
      
      {/* Mobile Quick Action Button */}
      <MobileQuickAction />
    </div>
  );
}
