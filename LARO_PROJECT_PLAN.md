# LARO - Basketball Matchmaking Web Application
## Comprehensive Design & Development Plan

### 🎯 Project Overview
LARO is a gaming-inspired basketball matchmaking web application that connects players, facilitates team creation, and enables court-based game scheduling with a Wild Rift/League of Legends aesthetic.

---

## 1. 🛠️ Technical Stack Recommendations

### Frontend
- **Framework**: Next.js 14 (App Router)
  - **Justification**: Server-side rendering, excellent performance, built-in optimization, TypeScript support
- **Styling**: Tailwind CSS + Framer Motion
  - **Justification**: Rapid development, consistent design system, smooth animations for gaming feel
- **State Management**: Zustand + React Query
  - **Justification**: Lightweight, TypeScript-friendly, excellent caching for real-time data
- **UI Components**: Radix UI + Custom Gaming Components
  - **Justification**: Accessible, customizable, perfect for gaming-inspired designs
- **Maps**: Mapbox GL JS
  - **Justification**: Superior customization, gaming-style map themes, excellent mobile performance

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js + Socket.io
  - **Justification**: Real-time features, WebSocket support for live updates
- **Authentication**: NextAuth.js + JWT
  - **Justification**: Multiple providers, secure, seamless integration
- **File Storage**: Cloudinary
  - **Justification**: Image optimization, CDN, avatar/team logo management

### Database
- **Primary**: PostgreSQL with Prisma ORM
  - **Justification**: ACID compliance, complex relationships, excellent TypeScript support
- **Caching**: Redis
  - **Justification**: Session management, real-time data caching, matchmaking queues
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)
  - **Justification**: Seamless deployment, auto-scaling, excellent developer experience

---

## 2. 🎮 Gaming-Inspired Design System

### Color Palette (Wild Rift Inspired)
```css
:root {
  /* Primary Colors */
  --gold-primary: #C89B3C;
  --gold-secondary: #F0E6D2;
  --blue-primary: #0F2027;
  --blue-secondary: #1E2328;
  --blue-accent: #5BC0DE;

  /* Status Colors */
  --success: #00F5FF;
  --warning: #F0E68C;
  --danger: #FF6B6B;
  --info: #A855F7;

  /* Neutral Colors */
  --bg-primary: #010A13;
  --bg-secondary: #1E2328;
  --bg-tertiary: #3C3C41;
  --text-primary: #F0E6D2;
  --text-secondary: #CDBE91;
  --text-muted: #5BC0DE;
}
```

### Typography
- **Primary Font**: Inter (Clean, modern)
- **Display Font**: Orbitron (Gaming feel for headers)
- **Accent Font**: Rajdhani (Numbers, stats)

### UI Components Style Guide
- **Buttons**: Hexagonal borders, gradient backgrounds, glow effects
- **Cards**: Dark backgrounds with gold/blue borders, subtle shadows
- **Navigation**: Side panel with animated icons
- **Forms**: Floating labels, animated focus states
- **Modals**: Full-screen overlays with blur effects

---

## 3. 🏗️ Core Features Implementation

### User Profiles & Authentication
```typescript
// User Profile Schema
interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  skillLevel: 1-10;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  stats: {
    gamesPlayed: number;
    wins: number;
    rating: number;
  };
  preferences: {
    maxDistance: number;
    preferredTimes: string[];
    gameTypes: string[];
  };
}
```

**Implementation Features:**
- Social login (Google, Facebook, Apple)
- Skill assessment questionnaire
- Avatar customization with gaming-style frames
- Achievement system with badges
- Player statistics dashboard

### Team Creation & Management
```typescript
interface Team {
  id: string;
  name: string;
  logo: string;
  captainId: string;
  members: TeamMember[];
  maxSize: number;
  skillRange: [number, number];
  description: string;
  isPublic: boolean;
  stats: TeamStats;
}
```

**Features:**
- Drag-and-drop team builder
- Role-based permissions (Captain, Co-Captain, Member)
- Team chemistry calculator
- Recruitment system with applications
- Team tournaments and leagues

### Court Location Mapping
```typescript
interface Court {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  amenities: string[];
  rating: number;
  photos: string[];
  availability: TimeSlot[];
  verified: boolean;
}
```

**Features:**
- Interactive map with custom gaming-style markers
- Court filtering (indoor/outdoor, lighting, etc.)
- Real-time availability
- User-generated court submissions
- Photo uploads and reviews

### Game Scheduling & Matchmaking
```typescript
interface GameSession {
  id: string;
  hostTeamId: string;
  opponentTeamId?: string;
  courtId: string;
  scheduledTime: Date;
  duration: number;
  gameType: 'casual' | 'competitive' | 'tournament';
  status: 'open' | 'matched' | 'in-progress' | 'completed';
  requirements: {
    skillRange: [number, number];
    maxDistance: number;
  };
}
```

**Features:**
- Smart matchmaking algorithm
- Real-time game invitations
- Automated scheduling suggestions
- Game result tracking
- Post-game rating system

---

## 4. 📱 UI/UX Wireframes & Screen Designs

### Main Dashboard
```
┌─────────────────────────────────────────────────────┐
│ [LARO LOGO]    [Search]    [Notifications] [Avatar] │
├─────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │   QUICK     │ │    FIND     │ │   CREATE    │     │
│ │   MATCH     │ │   COURTS    │ │    TEAM     │     │
│ │  [⚡ PLAY]   │ │  [🗺️ MAP]   │ │  [👥 NEW]   │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
├─────────────────────────────────────────────────────┤
│ Recent Games                    Upcoming Matches    │
│ ┌─────────────────────────────┐ ┌─────────────────┐ │
│ │ [Team A] vs [Team B]        │ │ Tomorrow 6PM    │ │
│ │ Victory +25 Rating          │ │ Court: Downtown │ │
│ │ ⭐⭐⭐⭐⭐                    │ │ [JOIN GAME]     │ │
│ └─────────────────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Profile Page
```
┌─────────────────────────────────────────────────────┐
│ ← Back                                    [Edit]    │
├─────────────────────────────────────────────────────┤
│     [AVATAR]        PlayerName                      │
│   [Gaming Frame]    Position: Point Guard           │
│                     Skill Level: ⭐⭐⭐⭐⭐⭐⭐⭐      │
│                     Rating: 1,847                   │
├─────────────────────────────────────────────────────┤
│ Stats                          Achievements         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │ Games: 127  │ │ Wins: 89    │ │ [🏆 BADGES] │     │
│ │ Win Rate    │ │ Streak: 5   │ │ [⚡ TITLES] │     │
│ │    70%      │ │ MVP: 23     │ │ [🎖️ RANKS]  │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
├─────────────────────────────────────────────────────┤
│ Recent Activity                                     │
│ • Won against Thunder Bolts (+25 rating)           │
│ • Joined team "Street Kings"                       │
│ • Unlocked achievement "Triple Double"             │
└─────────────────────────────────────────────────────┘
```

### Court Finder/Map View
```
┌─────────────────────────────────────────────────────┐
│ [Filter] [Search Courts...]           [List View]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│    🗺️ INTERACTIVE MAP                               │
│                                                     │
│  📍 Court A (4.8⭐)    📍 Court B (4.2⭐)           │
│      Available            Busy                      │
│                                                     │
│           📍 Court C (4.9⭐)                        │
│               Available                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Selected: Downtown Basketball Court                 │
│ ⭐⭐⭐⭐⭐ 4.8 (127 reviews) • 0.3 miles away        │
│ 🏀 Outdoor • 💡 Lighting • 🚗 Parking              │
│ [VIEW DETAILS] [BOOK COURT] [GET DIRECTIONS]        │
└─────────────────────────────────────────────────────┘
```

### Team Management
```
┌─────────────────────────────────────────────────────┐
│ [Team Logo] Street Kings                 [Settings] │
│ Captain: You • Members: 8/12 • Rating: 1,654       │
├─────────────────────────────────────────────────────┤
│ [INVITE PLAYERS] [SCHEDULE GAME] [VIEW STATS]       │
├─────────────────────────────────────────────────────┤
│ Starting Lineup                                     │
│ ┌─────────────────────────────────────────────────┐ │
│ │     PG        SG        SF        PF        C   │ │
│ │  [Player1]  [Player2] [Player3] [Player4] [You] │ │
│ │   ⭐⭐⭐⭐     ⭐⭐⭐⭐⭐    ⭐⭐⭐⭐     ⭐⭐⭐⭐⭐    ⭐⭐⭐⭐⭐⭐ │ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Bench Players                                       │
│ • Player6 (SG) ⭐⭐⭐⭐ [Move to Starting]           │
│ • Player7 (PF) ⭐⭐⭐⭐⭐ [Move to Starting]         │
│ • Player8 (C) ⭐⭐⭐ [Move to Starting]              │
└─────────────────────────────────────────────────────┘
```

### Game Scheduling Interface
```
┌─────────────────────────────────────────────────────┐
│ Create New Game                              [×]    │
├─────────────────────────────────────────────────────┤
│ Game Type: ○ Casual ● Competitive ○ Tournament     │
│                                                     │
│ Date & Time                                         │
│ [📅 Dec 15, 2024] [🕕 6:00 PM] Duration: [2 hrs]   │
│                                                     │
│ Court Selection                                     │
│ [🗺️ Downtown Court] [Change Court]                  │
│                                                     │
│ Team Requirements                                   │
│ Skill Range: [⭐⭐⭐] to [⭐⭐⭐⭐⭐⭐⭐]                │
│ Max Distance: [5 miles] ○ Public ● Private         │
│                                                     │
│ Additional Notes                                    │
│ [Text area for game description...]                │
│                                                     │
│ [CANCEL]                    [CREATE GAME]           │
└─────────────────────────────────────────────────────┘
```

---

## 5. 🗄️ Database Schema

### Core Tables
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  avatar_url TEXT,
  position VARCHAR(2) CHECK (position IN ('PG', 'SG', 'SF', 'PF', 'C')),
  skill_level INTEGER CHECK (skill_level BETWEEN 1 AND 10),
  rating INTEGER DEFAULT 1000,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  city VARCHAR(100),
  max_distance INTEGER DEFAULT 10,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  logo_url TEXT,
  captain_id UUID REFERENCES users(id),
  max_size INTEGER DEFAULT 12,
  min_skill_level INTEGER DEFAULT 1,
  max_skill_level INTEGER DEFAULT 10,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  rating INTEGER DEFAULT 1000,
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Team Members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('captain', 'co_captain', 'member')),
  position VARCHAR(2),
  is_starter BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Courts table
CREATE TABLE courts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  court_type VARCHAR(20) CHECK (court_type IN ('indoor', 'outdoor')),
  surface_type VARCHAR(20),
  has_lighting BOOLEAN DEFAULT FALSE,
  has_parking BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Games table
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_team_id UUID REFERENCES teams(id),
  opponent_team_id UUID REFERENCES teams(id),
  court_id UUID REFERENCES courts(id),
  scheduled_time TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 120,
  game_type VARCHAR(20) CHECK (game_type IN ('casual', 'competitive', 'tournament')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'matched', 'in_progress', 'completed', 'cancelled')),
  min_skill_level INTEGER,
  max_skill_level INTEGER,
  max_distance INTEGER,
  winner_team_id UUID REFERENCES teams(id),
  host_score INTEGER,
  opponent_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Game Invitations table
CREATE TABLE game_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  invited_team_id UUID REFERENCES teams(id),
  invited_by UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  invitation_code VARCHAR(10) UNIQUE,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Additional supporting tables
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  mvp_count INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  total_assists INTEGER DEFAULT 0,
  total_rebounds INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT,
  badge_type VARCHAR(20) CHECK (badge_type IN ('bronze', 'silver', 'gold', 'platinum')),
  requirements JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_achievements (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);
```

---

## 6. 🚀 Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Duration**: 4 weeks
**Team**: 2-3 developers

#### Week 1-2: Project Setup & Core Infrastructure
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Tailwind CSS with custom gaming theme
- [ ] Configure Prisma with PostgreSQL
- [ ] Implement authentication system (NextAuth.js)
- [ ] Create basic responsive layout components
- [ ] Set up CI/CD pipeline (GitHub Actions)

#### Week 3-4: User Management & Profiles
- [ ] User registration and login flows
- [ ] Profile creation with skill assessment
- [ ] Avatar upload and customization
- [ ] Basic user dashboard
- [ ] Mobile-responsive navigation

**Deliverables**:
- Working authentication system
- User profile management
- Responsive base layout

### Phase 2: Core Features (Weeks 5-10)
**Duration**: 6 weeks
**Team**: 3-4 developers

#### Week 5-6: Team System
- [ ] Team creation and management
- [ ] Member invitation system
- [ ] Role-based permissions
- [ ] Team statistics dashboard
- [ ] Team search and discovery

#### Week 7-8: Court Management
- [ ] Court database and API
- [ ] Interactive map integration (Mapbox)
- [ ] Geolocation services
- [ ] Court filtering and search
- [ ] User-generated court submissions

#### Week 9-10: Game Scheduling
- [ ] Game creation interface
- [ ] Basic matchmaking algorithm
- [ ] Calendar integration
- [ ] Game invitation system
- [ ] QR code generation for invites

**Deliverables**:
- Complete team management system
- Interactive court finder
- Basic game scheduling

### Phase 3: Advanced Features (Weeks 11-16)
**Duration**: 6 weeks
**Team**: 4-5 developers

#### Week 11-12: Real-time Features
- [ ] WebSocket integration (Socket.io)
- [ ] Real-time notifications
- [ ] Live game updates
- [ ] Chat system for teams
- [ ] Push notifications (PWA)

#### Week 13-14: Matchmaking & Gaming Features
- [ ] Advanced matchmaking algorithm
- [ ] Skill-based team balancing
- [ ] Achievement system
- [ ] Rating and ranking system
- [ ] Game statistics tracking

#### Week 15-16: Mobile Optimization
- [ ] PWA implementation
- [ ] Mobile-specific UI optimizations
- [ ] Offline functionality
- [ ] App store preparation
- [ ] Performance optimization

**Deliverables**:
- Real-time communication features
- Advanced matchmaking system
- Mobile-optimized experience

### Phase 4: Polish & Launch (Weeks 17-20)
**Duration**: 4 weeks
**Team**: 3-4 developers + QA

#### Week 17-18: Testing & Bug Fixes
- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] Security audit
- [ ] Cross-browser compatibility
- [ ] Load testing

#### Week 19-20: Launch Preparation
- [ ] Production deployment
- [ ] Monitoring and analytics setup
- [ ] User onboarding flow
- [ ] Documentation and help system
- [ ] Marketing website

**Deliverables**:
- Production-ready application
- Complete testing coverage
- Launch-ready platform

---

## 7. 🎨 Gaming UI Component Library

### Custom Components
```typescript
// Gaming-style button component
interface GameButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  size: 'sm' | 'md' | 'lg';
  glow?: boolean;
  hexagonal?: boolean;
  children: React.ReactNode;
}

// Stat card with animated counters
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  animated?: boolean;
}

// Gaming-style modal with blur backdrop
interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### Animation Presets
```typescript
// Framer Motion variants for gaming feel
export const gameAnimations = {
  slideInFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  glowPulse: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(200, 155, 60, 0.5)',
        '0 0 40px rgba(200, 155, 60, 0.8)',
        '0 0 20px rgba(200, 155, 60, 0.5)'
      ]
    }
  }
};
```

---

## 8. 📱 Responsive Design Strategy

### Breakpoint System
```css
/* Mobile First Approach */
:root {
  --mobile: 320px;
  --tablet: 768px;
  --desktop: 1024px;
  --large: 1440px;
}

/* Gaming-optimized spacing */
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
}
```

### Mobile-Specific Features
- **Bottom Navigation**: Gaming-style tab bar for mobile
- **Swipe Gestures**: Card-based navigation
- **Touch Optimized**: Larger touch targets (44px minimum)
- **Haptic Feedback**: For button interactions
- **Pull-to-Refresh**: For real-time data updates

### Desktop Enhancements
- **Sidebar Navigation**: Persistent gaming-style sidebar
- **Keyboard Shortcuts**: Power user features
- **Multi-panel Layout**: Dashboard with multiple data views
- **Hover Effects**: Rich interactions and tooltips

---

## 9. 🔧 Development Tools & Setup

### Required Tools
```bash
# Node.js and package manager
node --version  # v18+
npm --version   # v9+

# Database
postgresql      # v14+
redis          # v6+

# Development tools
git
vscode
docker         # For local development
```

### Environment Setup
```bash
# Clone and setup
git clone <repository>
cd laro-app
npm install

# Environment variables
cp .env.example .env.local
# Configure database, auth, and API keys

# Database setup
npx prisma migrate dev
npx prisma db seed

# Start development
npm run dev
```

---

## 10. 📊 Success Metrics & KPIs

### User Engagement
- Daily Active Users (DAU)
- Session duration
- Games scheduled per user
- Team participation rate

### Platform Health
- Successful game completion rate
- User retention (7-day, 30-day)
- Court utilization
- Matchmaking success rate

### Technical Metrics
- Page load times (<2s)
- API response times (<500ms)
- Mobile performance score (>90)
- Uptime (99.9%+)

---

This comprehensive plan provides a solid foundation for building LARO with a gaming-inspired aesthetic while maintaining professional basketball matchmaking functionality. The phased approach ensures steady progress with regular deliverables and testing milestones.
