# LARO Gaming UI Components Specification

## 🎮 Design System Overview

### Color System
```typescript
export const colors = {
  // Primary Gaming Colors (Wild Rift Inspired)
  primary: {
    50: '#FDF6E3',   // Light gold
    100: '#F0E6D2',  // Cream
    200: '#E6CC80',  // Light gold
    300: '#CDBE91',  // Medium gold
    400: '#C89B3C',  // Primary gold
    500: '#B8860B',  // Dark gold
    600: '#9A7328',  // Darker gold
    700: '#7C5E1A',  // Deep gold
    800: '#5E4A0C',  // Very dark gold
    900: '#3F3108'   // Darkest gold
  },
  
  // Gaming Blue Accents
  accent: {
    50: '#E6F7FF',   // Very light blue
    100: '#BAE7FF',  // Light blue
    200: '#91D5FF',  // Medium light blue
    300: '#69C0FF',  // Medium blue
    400: '#40A9FF',  // Primary blue
    500: '#1890FF',  // Standard blue
    600: '#096DD9',  // Dark blue
    700: '#0050B3',  // Darker blue
    800: '#003A8C',  // Very dark blue
    900: '#002766'   // Darkest blue
  },
  
  // Dark Theme Base
  dark: {
    50: '#3C3C41',   // Lightest dark
    100: '#2F2F35',  // Light dark
    200: '#26262B',  // Medium light dark
    300: '#1E2328',  // Medium dark
    400: '#1B1E23',  // Primary dark
    500: '#16191E',  // Standard dark
    600: '#121419',  // Dark
    700: '#0E1014',  // Darker
    800: '#0A0C0F',  // Very dark
    900: '#010A13'   // Darkest (background)
  },
  
  // Status Colors
  success: '#00F5FF',  // Cyan success
  warning: '#F0E68C',  // Khaki warning
  danger: '#FF6B6B',   // Red danger
  info: '#A855F7'      // Purple info
};
```

### Typography Scale
```typescript
export const typography = {
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    display: 'Orbitron, monospace',
    accent: 'Rajdhani, sans-serif'
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
  },
  
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
};
```

## 🧩 Core UI Components

### 1. GameButton Component
```typescript
interface GameButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size: 'sm' | 'md' | 'lg' | 'xl';
  shape: 'rounded' | 'hexagonal' | 'sharp';
  glow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Usage Examples:
<GameButton variant="primary" size="lg" glow>
  QUICK MATCH
</GameButton>

<GameButton variant="secondary" shape="hexagonal" icon={<PlayIcon />}>
  Join Game
</GameButton>
```

### 2. StatCard Component
```typescript
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
    label?: string;
  };
  animated?: boolean;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Usage Example:
<StatCard
  title="Win Rate"
  value="87%"
  icon={<TrophyIcon />}
  trend={{ direction: 'up', value: 5, label: '+5% this week' }}
  animated
  glowColor="success"
/>
```

### 3. PlayerCard Component
```typescript
interface PlayerCardProps {
  player: {
    id: string;
    username: string;
    avatar: string;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
    skillLevel: number;
    rating: number;
    isOnline?: boolean;
  };
  variant: 'compact' | 'detailed' | 'lineup';
  interactive?: boolean;
  selected?: boolean;
  onSelect?: (playerId: string) => void;
  showStats?: boolean;
}

// Usage Example:
<PlayerCard
  player={{
    id: '1',
    username: 'KobeMamba',
    avatar: '/avatars/player1.jpg',
    position: 'SG',
    skillLevel: 9,
    rating: 2847,
    isOnline: true
  }}
  variant="detailed"
  interactive
  showStats
/>
```

### 4. GameModal Component
```typescript
interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
}

// Usage Example:
<GameModal
  isOpen={showCreateTeam}
  onClose={() => setShowCreateTeam(false)}
  title="Create New Team"
  size="lg"
>
  <TeamCreationForm />
</GameModal>
```

### 5. SkillRating Component
```typescript
interface SkillRatingProps {
  level: number; // 1-10
  maxLevel?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onChange?: (level: number) => void;
  variant?: 'stars' | 'bars' | 'hexagons';
}

// Usage Example:
<SkillRating
  level={7}
  size="lg"
  showNumber
  variant="stars"
  interactive
  onChange={(level) => setSkillLevel(level)}
/>
```

## 🎨 Gaming-Specific Components

### 6. AchievementBadge Component
```typescript
interface AchievementBadgeProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: Date;
  };
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  locked?: boolean;
}

// Usage Example:
<AchievementBadge
  achievement={{
    id: '1',
    name: 'Triple Double',
    description: 'Score 10+ points, assists, and rebounds in a game',
    icon: '/achievements/triple-double.svg',
    rarity: 'epic',
    unlockedAt: new Date()
  }}
  size="md"
  showTooltip
/>
```

### 7. TeamLineup Component
```typescript
interface TeamLineupProps {
  team: {
    id: string;
    name: string;
    logo?: string;
    players: Player[];
  };
  formation: '5-0' | '4-1' | '3-2' | '2-3';
  interactive?: boolean;
  onPlayerMove?: (playerId: string, position: string) => void;
  showSubstitutes?: boolean;
}

// Usage Example:
<TeamLineup
  team={currentTeam}
  formation="5-0"
  interactive
  onPlayerMove={handlePlayerMove}
  showSubstitutes
/>
```

### 8. GameInviteCard Component
```typescript
interface GameInviteCardProps {
  invite: {
    id: string;
    gameId: string;
    hostTeam: Team;
    court: Court;
    scheduledTime: Date;
    gameType: 'casual' | 'competitive' | 'tournament';
    skillRange: [number, number];
  };
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
  onViewDetails: (gameId: string) => void;
}

// Usage Example:
<GameInviteCard
  invite={gameInvite}
  onAccept={handleAcceptInvite}
  onDecline={handleDeclineInvite}
  onViewDetails={handleViewGameDetails}
/>
```

## 🗺️ Map Components

### 9. CourtMap Component
```typescript
interface CourtMapProps {
  courts: Court[];
  center?: [number, number]; // [lat, lng]
  zoom?: number;
  selectedCourtId?: string;
  onCourtSelect: (court: Court) => void;
  showUserLocation?: boolean;
  filterOptions?: {
    courtType?: 'indoor' | 'outdoor';
    hasLighting?: boolean;
    maxDistance?: number;
  };
}

// Usage Example:
<CourtMap
  courts={nearbyCourts}
  center={userLocation}
  zoom={12}
  selectedCourtId={selectedCourt?.id}
  onCourtSelect={setSelectedCourt}
  showUserLocation
  filterOptions={mapFilters}
/>
```

### 10. CourtMarker Component
```typescript
interface CourtMarkerProps {
  court: Court;
  isSelected?: boolean;
  onClick: (court: Court) => void;
  showAvailability?: boolean;
}

// Usage Example:
<CourtMarker
  court={court}
  isSelected={selectedCourt?.id === court.id}
  onClick={handleCourtClick}
  showAvailability
/>
```

## 📱 Mobile-Optimized Components

### 11. MobileBottomNav Component
```typescript
interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  notifications?: {
    games?: number;
    teams?: number;
    messages?: number;
  };
}

// Usage Example:
<MobileBottomNav
  currentRoute="/dashboard"
  onNavigate={handleNavigation}
  notifications={{
    games: 2,
    teams: 1,
    messages: 5
  }}
/>
```

### 12. SwipeableCard Component
```typescript
interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
  rightAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
}

// Usage Example:
<SwipeableCard
  onSwipeLeft={handleDecline}
  onSwipeRight={handleAccept}
  leftAction={{
    icon: <XIcon />,
    color: 'danger',
    label: 'Decline'
  }}
  rightAction={{
    icon: <CheckIcon />,
    color: 'success',
    label: 'Accept'
  }}
>
  <GameInviteContent />
</SwipeableCard>
```

## 🎯 Animation Specifications

### Entrance Animations
```typescript
export const entranceAnimations = {
  slideInFromBottom: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  },
  
  fadeInUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};
```

### Hover Effects
```typescript
export const hoverEffects = {
  glow: {
    whileHover: {
      boxShadow: '0 0 20px rgba(200, 155, 60, 0.6)',
      scale: 1.02
    },
    transition: { duration: 0.2 }
  },
  
  lift: {
    whileHover: {
      y: -4,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
    },
    transition: { duration: 0.2 }
  }
};
```

This comprehensive UI component specification provides the foundation for building a cohesive, gaming-inspired interface that maintains consistency across all screens while delivering an engaging user experience.
