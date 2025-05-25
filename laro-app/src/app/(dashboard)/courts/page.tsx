'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import {
  MapPin,
  Search,
  Filter,
  List,
  Map as MapIcon,
  Navigation,
  Star,
  Plus,
  Crosshair
} from 'lucide-react';
import { AuthenticatedHeader } from '@/components/layout/header';
import { Sidebar, MobileSidebar } from '@/components/layout/sidebar';
import { MobileBottomNav, MobileQuickAction } from '@/components/layout/mobile-nav';
import { GameButton } from '@/components/ui/game-button';
import { CourtCard } from '@/components/game/court-card';
import { cn } from '@/lib/utils';
import { Court, CourtFilters } from '@/types';
import { calculateDistance } from '@/lib/utils';

// Lazy load heavy components
import {
  LazyCourtMap,
  CourtMapSkeleton,
  LazyWrapper
} from '@/components/lazy';
import { useLazyLoadTracking, usePreloadOnHover } from '@/lib/performance/lazy-loading';

// Mock data for courts
const mockUser = {
  username: 'CourtKing23',
  avatar: '',
  rating: 1847
};

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
    createdAt: new Date('2024-01-15'),
    photos: [
      '/courts/venice-1.jpg',
      '/courts/venice-2.jpg',
      '/courts/venice-3.jpg'
    ],
    amenities: ['Restrooms', 'Water Fountain', 'Nearby Food', 'Beach Access']
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
    createdAt: new Date('2024-02-01'),
    photos: [
      '/courts/downtown-1.jpg',
      '/courts/downtown-2.jpg'
    ],
    amenities: ['Locker Rooms', 'Showers', 'Pro Shop', 'Cafe', 'Air Conditioning']
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
    createdAt: new Date('2024-01-20'),
    photos: [
      '/courts/griffith-1.jpg'
    ],
    amenities: ['Picnic Area', 'Hiking Trails', 'Observatory Nearby']
  },
  {
    id: '4',
    name: 'Santa Monica Pier Courts',
    address: '200 Santa Monica Pier, Santa Monica, CA 90401',
    latitude: 34.0089,
    longitude: -118.4973,
    courtType: 'outdoor',
    surfaceType: 'Sport Court',
    hasLighting: true,
    hasParking: false,
    rating: 4.0,
    reviewCount: 203,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    photos: [
      '/courts/santa-monica-1.jpg',
      '/courts/santa-monica-2.jpg',
      '/courts/santa-monica-3.jpg',
      '/courts/santa-monica-4.jpg'
    ],
    amenities: ['Ocean View', 'Amusement Park', 'Restaurants', 'Beach Access']
  },
  {
    id: '5',
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
    createdAt: new Date('2024-02-05'),
    photos: [
      '/courts/ucla-1.jpg',
      '/courts/ucla-2.jpg'
    ],
    amenities: ['Student Discounts', 'Equipment Rental', 'Fitness Center', 'Pool']
  }
];

export default function CourtsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list'); // Start with list view for better performance
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [filters, setFilters] = useState<CourtFilters>({
    courtType: undefined,
    hasLighting: undefined,
    hasParking: undefined,
    maxDistance: 25,
    minRating: 0
  });

  // Track lazy loading performance
  useLazyLoadTracking('CourtsPage');

  // Preload map on hover for better UX
  const mapPreload = usePreloadOnHover(
    () => import('@/components/maps/court-map'),
    'CourtMap'
  );

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to LA if location access denied
          setUserLocation({ lat: 34.0522, lng: -118.2437 });
        }
      );
    }
  }, []);

  // Filter courts based on search and filters
  const filteredCourts = mockCourts.filter(court => {
    // Search filter
    if (searchQuery && !court.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !court.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Court type filter
    if (filters.courtType && court.courtType !== filters.courtType) {
      return false;
    }

    // Amenities filters
    if (filters.hasLighting && !court.hasLighting) {
      return false;
    }
    if (filters.hasParking && !court.hasParking) {
      return false;
    }

    // Rating filter
    if (filters.minRating && court.rating < filters.minRating) {
      return false;
    }

    // Distance filter
    if (filters.maxDistance && userLocation) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        court.latitude,
        court.longitude
      );
      if (distance > filters.maxDistance) {
        return false;
      }
    }

    return true;
  });

  // Add distance to courts
  const courtsWithDistance = filteredCourts.map(court => ({
    ...court,
    distance: userLocation ? calculateDistance(
      userLocation.lat,
      userLocation.lng,
      court.latitude,
      court.longitude
    ) : undefined
  }));

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
  };

  const handleGetDirections = (court: Court) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${court.latitude},${court.longitude}`;
      window.open(url, '_blank');
    }
  };

  const handleBookCourt = (court: Court) => {
    console.log('Booking court:', court.id);
    // Implement booking logic
  };

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
            {/* Page Header */}
            <motion.div
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                  Courts 🗺️
                </h1>
                <p className="text-primary-200 text-lg">
                  Discover basketball courts near you
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <GameButton
                  variant="secondary"
                  size="md"
                  icon={<Plus className="w-5 h-5" />}
                >
                  Add Court
                </GameButton>
              </div>
            </motion.div>

            {/* Search and Controls */}
            <motion.div
              className="bg-gradient-to-r from-dark-300/80 to-dark-400/80 backdrop-blur-sm rounded-xl p-6 border border-primary-400/20 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-primary-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-primary-400/30 rounded-lg bg-dark-200/50 text-primary-100 placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Search courts by name or location..."
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-dark-200/50 rounded-lg p-1">
                  <button
                    onClick={() => {
                      setViewMode('map');
                      setMapLoaded(true);
                    }}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
                      viewMode === 'map'
                        ? 'bg-primary-500 text-white'
                        : 'text-primary-300 hover:text-primary-100'
                    )}
                    {...mapPreload}
                  >
                    <MapIcon className="w-4 h-4" />
                    <span>Map</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white'
                        : 'text-primary-300 hover:text-primary-100'
                    )}
                  >
                    <List className="w-4 h-4" />
                    <span>List</span>
                  </button>
                </div>

                {/* Location Button */}
                <GameButton
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          });
                        }
                      );
                    }
                  }}
                  icon={<Crosshair className="w-5 h-5" />}
                >
                  My Location
                </GameButton>
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-primary-300">
                Found {filteredCourts.length} courts
                {searchQuery && ` matching "${searchQuery}"`}
                {userLocation && ' near you'}
              </p>

              <div className="flex items-center space-x-2 text-sm text-primary-300">
                <span>Sort by:</span>
                <select className="bg-dark-200/50 border border-primary-400/30 rounded px-2 py-1 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="reviews">Reviews</option>
                </select>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {viewMode === 'map' ? (
                <div className="space-y-6">
                  {/* Lazy Loaded Map */}
                  {mapLoaded ? (
                    <LazyWrapper fallback={<CourtMapSkeleton />}>
                      <LazyCourtMap
                        courts={filteredCourts}
                        userLocation={userLocation}
                        selectedCourt={selectedCourt}
                        onCourtSelect={handleCourtSelect}
                        onLocationChange={setUserLocation}
                        filters={filters}
                        onFiltersChange={setFilters}
                      />
                    </LazyWrapper>
                  ) : (
                    <div className="text-center py-16">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MapIcon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          Map View
                        </h3>
                        <p className="text-primary-300 mb-6">
                          Switch to map view to see courts on an interactive map
                        </p>
                        <GameButton
                          variant="primary"
                          size="lg"
                          onClick={() => {
                            setViewMode('map');
                            setMapLoaded(true);
                          }}
                          {...mapPreload}
                          icon={<MapIcon className="w-5 h-5" />}
                        >
                          Load Map
                        </GameButton>
                      </motion.div>
                    </div>
                  )}

                  {/* Selected Court Details */}
                  {selectedCourt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CourtCard
                        court={selectedCourt}
                        variant="detailed"
                        distance={courtsWithDistance.find(c => c.id === selectedCourt.id)?.distance}
                        onGetDirections={() => handleGetDirections(selectedCourt)}
                        onBookCourt={() => handleBookCourt(selectedCourt)}
                      />
                    </motion.div>
                  )}
                </div>
              ) : (
                /* List View */
                <div className="space-y-6">
                  {courtsWithDistance.map((court, index) => (
                    <motion.div
                      key={court.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <CourtCard
                        court={court}
                        variant="detailed"
                        distance={court.distance}
                        onViewDetails={() => setSelectedCourt(court)}
                        onGetDirections={() => handleGetDirections(court)}
                        onBookCourt={() => handleBookCourt(court)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Empty State */}
            {filteredCourts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  No courts found
                </h3>
                <p className="text-primary-300 mb-6">
                  {searchQuery
                    ? `No courts match your search for "${searchQuery}"`
                    : 'No courts match your current filters'
                  }
                </p>
                <GameButton
                  variant="primary"
                  size="lg"
                  icon={<Plus className="w-5 h-5" />}
                >
                  Add a Court
                </GameButton>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav
        notifications={{
          courts: 2
        }}
      />

      {/* Mobile Quick Action Button */}
      <MobileQuickAction />
    </div>
  );
}
