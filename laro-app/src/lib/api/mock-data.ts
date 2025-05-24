// Mock data for development mode
import { User, Team, TeamWithMembers, Game, GameWithDetails, Court, ApiResponse, PaginatedResponse } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'CourtKing23',
    email: 'courtking@example.com',
    avatar: '',
    position: 'PG',
    skillLevel: 8,
    rating: 1847,
    locationLat: 40.7128,
    locationLng: -74.0060,
    city: 'New York',
    maxDistance: 25,
    isVerified: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'user2',
    username: 'SlamDunk99',
    email: 'slamdunk@example.com',
    avatar: '',
    position: 'SF',
    skillLevel: 7,
    rating: 1654,
    locationLat: 40.7589,
    locationLng: -73.9851,
    city: 'New York',
    maxDistance: 20,
    isVerified: true,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-01-10')
  }
];

// Mock Teams
export const mockTeams: TeamWithMembers[] = [
  {
    id: 'team1',
    name: 'Street Ballers',
    logoUrl: '',
    captainId: 'user1',
    maxSize: 12,
    minSkillLevel: 6,
    maxSkillLevel: 10,
    description: 'Competitive street basketball team looking for skilled players',
    isPublic: true,
    rating: 1750,
    gamesPlayed: 45,
    wins: 32,
    createdAt: new Date('2023-06-01'),
    captain: mockUsers[0],
    members: [
      {
        id: 'member1',
        teamId: 'team1',
        userId: 'user1',
        role: 'captain',
        position: 'PG',
        isStarter: true,
        joinedAt: new Date('2023-06-01'),
        user: mockUsers[0]
      }
    ],
    memberCount: 8
  },
  {
    id: 'team2',
    name: 'Court Legends',
    logoUrl: '',
    captainId: 'user2',
    maxSize: 10,
    minSkillLevel: 5,
    maxSkillLevel: 8,
    description: 'Fun recreational team for weekend games',
    isPublic: true,
    rating: 1580,
    gamesPlayed: 28,
    wins: 18,
    createdAt: new Date('2023-08-15'),
    captain: mockUsers[1],
    members: [
      {
        id: 'member2',
        teamId: 'team2',
        userId: 'user2',
        role: 'captain',
        position: 'SF',
        isStarter: true,
        joinedAt: new Date('2023-08-15'),
        user: mockUsers[1]
      }
    ],
    memberCount: 6
  }
];

// Mock Courts
export const mockCourts: Court[] = [
  {
    id: 'court1',
    name: 'Central Park Basketball Courts',
    address: '1 Central Park West, New York, NY 10023',
    latitude: 40.7829,
    longitude: -73.9654,
    courtType: 'outdoor',
    surfaceType: 'Asphalt',
    hasLighting: true,
    hasParking: false,
    rating: 4.5,
    reviewCount: 127,
    isVerified: true,
    createdBy: 'user1',
    createdAt: new Date('2023-01-01'),
    photos: [],
    amenities: ['Lighting', 'Multiple Courts', 'Water Fountain']
  },
  {
    id: 'court2',
    name: 'Brooklyn Bridge Park Courts',
    address: '334 Furman St, Brooklyn, NY 11201',
    latitude: 40.7024,
    longitude: -73.9969,
    courtType: 'outdoor',
    surfaceType: 'Rubber',
    hasLighting: true,
    hasParking: true,
    rating: 4.8,
    reviewCount: 89,
    isVerified: true,
    createdBy: 'user2',
    createdAt: new Date('2023-02-15'),
    photos: [],
    amenities: ['Lighting', 'Parking', 'Restrooms', 'Water Fountain']
  }
];

// Mock Games
export const mockGames: GameWithDetails[] = [
  {
    id: 'game1',
    hostTeamId: 'team1',
    opponentTeamId: 'team2',
    courtId: 'court1',
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    durationMinutes: 120,
    gameType: 'competitive',
    status: 'open',
    minSkillLevel: 6,
    maxSkillLevel: 10,
    maxDistance: 25,
    createdAt: new Date(),
    hostTeam: mockTeams[0],
    opponentTeam: mockTeams[1],
    court: mockCourts[0]
  },
  {
    id: 'game2',
    hostTeamId: 'team2',
    courtId: 'court2',
    scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
    durationMinutes: 90,
    gameType: 'casual',
    status: 'open',
    minSkillLevel: 4,
    maxSkillLevel: 8,
    maxDistance: 20,
    createdAt: new Date(),
    hostTeam: mockTeams[1],
    court: mockCourts[1]
  }
];

// Mock API Response Helpers
export const createMockApiResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  success: true,
  message: 'Success'
});

export const createMockPaginatedResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): ApiResponse<PaginatedResponse<T>> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return createMockApiResponse({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit)
    }
  });
};

// Development mode API interceptor
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// Simulate API delay for realistic UX
export const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API responses for different endpoints
export const mockApiResponses = {
  // Auth endpoints
  '/auth/me': () => createMockApiResponse(mockUsers[0]),
  
  // Teams endpoints
  '/teams': (params?: any) => {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    return createMockPaginatedResponse(mockTeams, page, limit);
  },
  
  // Games endpoints
  '/games': (params?: any) => {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    return createMockPaginatedResponse(mockGames, page, limit);
  },
  
  // Courts endpoints
  '/courts': (params?: any) => {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    return createMockPaginatedResponse(mockCourts, page, limit);
  },
  
  // User stats endpoint
  '/users/[id]/stats': () => createMockApiResponse({
    gamesPlayed: 45,
    wins: 32,
    losses: 13,
    winRate: 71.1,
    averageScore: 18.5,
    totalPoints: 832,
    currentStreak: 3,
    bestStreak: 8
  })
};

export default {
  mockUsers,
  mockTeams,
  mockCourts,
  mockGames,
  createMockApiResponse,
  createMockPaginatedResponse,
  isDevelopmentMode,
  simulateApiDelay,
  mockApiResponses
};
