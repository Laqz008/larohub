# LARO Implementation Guide

## 🚀 Quick Start Implementation

### 1. Project Initialization

```bash
# Create the project structure
npx create-next-app@latest laro-app --typescript --tailwind --app
cd laro-app

# Install additional dependencies
npm install @prisma/client prisma
npm install @next-auth/prisma-adapter next-auth
npm install framer-motion lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install zustand @tanstack/react-query
npm install mapbox-gl react-map-gl
npm install socket.io-client

# Development dependencies
npm install -D @types/mapbox-gl
```

### 2. Environment Configuration

```bash
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/laro_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your-mapbox-token"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis
REDIS_URL="redis://localhost:6379"
```

### 3. Prisma Schema Setup

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  username      String    @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?
  position      Position?
  skillLevel    Int       @default(1)
  rating        Int       @default(1000)
  locationLat   Float?
  locationLng   Float?
  city          String?
  maxDistance   Int       @default(10)
  isVerified    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  captainTeams  Team[]    @relation("TeamCaptain")
  teamMembers   TeamMember[]
  createdCourts Court[]
  hostedGames   Game[]    @relation("HostTeam")
  invitations   GameInvitation[]
  stats         UserStats?
  achievements  UserAchievement[]

  @@map("users")
}

model Team {
  id             String   @id @default(cuid())
  name           String
  logoUrl        String?
  captainId      String
  maxSize        Int      @default(12)
  minSkillLevel  Int      @default(1)
  maxSkillLevel  Int      @default(10)
  description    String?
  isPublic       Boolean  @default(true)
  rating         Int      @default(1000)
  gamesPlayed    Int      @default(0)
  wins           Int      @default(0)
  createdAt      DateTime @default(now())

  // Relations
  captain        User         @relation("TeamCaptain", fields: [captainId], references: [id])
  members        TeamMember[]
  hostedGames    Game[]       @relation("HostTeam")
  opponentGames  Game[]       @relation("OpponentTeam")
  invitations    GameInvitation[]

  @@map("teams")
}

enum Position {
  PG // Point Guard
  SG // Shooting Guard
  SF // Small Forward
  PF // Power Forward
  C  // Center
}

enum GameType {
  CASUAL
  COMPETITIVE
  TOURNAMENT
}

enum GameStatus {
  OPEN
  MATCHED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

### 4. Gaming Theme Configuration

```typescript
// lib/theme.ts
export const gameTheme = {
  colors: {
    primary: {
      50: '#FDF6E3',
      400: '#C89B3C',
      500: '#B8860B',
      900: '#3F3108'
    },
    dark: {
      100: '#2F2F35',
      400: '#1B1E23',
      900: '#010A13'
    },
    accent: {
      400: '#40A9FF',
      500: '#1890FF'
    }
  },
  
  animations: {
    glow: 'glow 2s ease-in-out infinite alternate',
    pulse: 'pulse 1.5s ease-in-out infinite',
    slideIn: 'slideIn 0.3s ease-out'
  },
  
  shadows: {
    glow: '0 0 20px rgba(200, 155, 60, 0.5)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }
};
```

### 5. Custom Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF6E3',
          100: '#F0E6D2',
          200: '#E6CC80',
          300: '#CDBE91',
          400: '#C89B3C',
          500: '#B8860B',
          600: '#9A7328',
          700: '#7C5E1A',
          800: '#5E4A0C',
          900: '#3F3108'
        },
        dark: {
          50: '#3C3C41',
          100: '#2F2F35',
          200: '#26262B',
          300: '#1E2328',
          400: '#1B1E23',
          500: '#16191E',
          600: '#121419',
          700: '#0E1014',
          800: '#0A0C0F',
          900: '#010A13'
        },
        accent: {
          400: '#40A9FF',
          500: '#1890FF'
        }
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Orbitron', 'monospace'],
        'accent': ['Rajdhani', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(200, 155, 60, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(200, 155, 60, 0.8)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(200, 155, 60, 0.5)',
        'glow-lg': '0 0 40px rgba(200, 155, 60, 0.8)',
        'game': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
```

### 6. Core Component Examples

```typescript
// components/ui/game-button.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GameButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GameButton({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className,
  onClick
}: GameButtonProps) {
  const baseClasses = 'font-accent font-semibold transition-all duration-200 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-500 text-dark-900 hover:from-primary-300 hover:to-primary-400',
    secondary: 'bg-dark-300 text-primary-100 border border-primary-400 hover:bg-dark-200',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glow && 'shadow-glow hover:shadow-glow-lg',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

```typescript
// components/ui/stat-card.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <motion.div
      className={cn(
        'bg-dark-300 border border-primary-400/20 rounded-lg p-6',
        'hover:border-primary-400/40 transition-all duration-200',
        className
      )}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-primary-400 text-2xl">{icon}</div>
          <div>
            <p className="text-primary-100 text-sm font-medium">{title}</p>
            <p className="text-white text-2xl font-bold font-accent">{value}</p>
          </div>
        </div>
        
        {trend && (
          <div className={cn('text-sm font-medium', trendColor[trend.direction])}>
            {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {trend.value}%
          </div>
        )}
      </div>
    </motion.div>
  );
}
```

### 7. State Management Setup

```typescript
// lib/stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  position?: string;
  skillLevel: number;
  rating: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

```typescript
// lib/stores/game-store.ts
import { create } from 'zustand';

interface Game {
  id: string;
  hostTeam: string;
  court: string;
  scheduledTime: Date;
  status: 'open' | 'matched' | 'in_progress' | 'completed';
}

interface GameState {
  games: Game[];
  selectedGame: Game | null;
  setGames: (games: Game[]) => void;
  setSelectedGame: (game: Game | null) => void;
  addGame: (game: Game) => void;
  updateGame: (id: string, updates: Partial<Game>) => void;
}

export const useGameStore = create<GameState>((set) => ({
  games: [],
  selectedGame: null,
  setGames: (games) => set({ games }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  updateGame: (id, updates) => set((state) => ({
    games: state.games.map(game => 
      game.id === id ? { ...game, ...updates } : game
    )
  })),
}));
```

### 8. API Route Examples

```typescript
// app/api/teams/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { isPublic: true },
          { 
            members: {
              some: {
                user: { email: session.user.email }
              }
            }
          }
        ]
      },
      include: {
        captain: true,
        members: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            members: true,
            hostedGames: true
          }
        }
      }
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, maxSize, isPublic } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
        maxSize: maxSize || 12,
        isPublic: isPublic ?? true,
        captainId: user.id,
        members: {
          create: {
            userId: user.id,
            role: 'captain',
            isStarter: true
          }
        }
      },
      include: {
        captain: true,
        members: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

This implementation guide provides the foundation for building the LARO application with proper TypeScript types, state management, and gaming-inspired UI components. The modular structure ensures scalability and maintainability as the application grows.
