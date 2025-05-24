# Phase 1: Critical Backend Infrastructure Implementation

## 🎯 Goal
Implement the foundational backend infrastructure to enable real data persistence and authentication, transforming the app from a UI demo to a functional basketball platform.

## 📋 Phase 1 Tasks Overview

### 1.1 Database Setup (Priority: CRITICAL)
### 1.2 Authentication System (Priority: CRITICAL)  
### 1.3 Core API Endpoints (Priority: HIGH)

---

## 🗄️ Task 1.1: Database Setup

### Step 1: Create Prisma Schema
**File: `laro-app/prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  username    String   @unique
  password    String
  avatar      String?
  position    Position?
  skillLevel  Int      @default(5)
  rating      Int      @default(1000)
  latitude    Float?
  longitude   Float?
  city        String?
  isVerified  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  captainTeams    Team[]       @relation("TeamCaptain")
  teamMemberships TeamMember[]
  organizedGames  Game[]       @relation("GameOrganizer")
  gameParticipants GameParticipant[]
  courtReviews    CourtReview[]

  @@map("users")
}

model Team {
  id            String   @id @default(cuid())
  name          String
  logoUrl       String?
  description   String?
  maxSize       Int      @default(12)
  minSkillLevel Int      @default(1)
  maxSkillLevel Int      @default(10)
  isPublic      Boolean  @default(true)
  rating        Int      @default(1000)
  gamesPlayed   Int      @default(0)
  wins          Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  captainId String
  captain   User         @relation("TeamCaptain", fields: [captainId], references: [id])
  members   TeamMember[]
  hostGames Game[]       @relation("HostTeam")
  opponentGames Game[]   @relation("OpponentTeam")

  @@map("teams")
}

model TeamMember {
  id        String   @id @default(cuid())
  role      Role     @default(MEMBER)
  position  Position?
  isStarter Boolean  @default(false)
  joinedAt  DateTime @default(now())

  // Relations
  teamId String
  team   Team   @relation(fields: [teamId], references: [id], onDelete: Cascade)
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
  @@map("team_members")
}

model Game {
  id            String     @id @default(cuid())
  title         String
  description   String?
  gameType      GameType   @default(PICKUP)
  status        GameStatus @default(SCHEDULED)
  scheduledAt   DateTime
  duration      Int        @default(120) // minutes
  maxPlayers    Int        @default(10)
  skillLevelMin Int        @default(1)
  skillLevelMax Int        @default(10)
  isPrivate     Boolean    @default(false)
  hostScore     Int?
  opponentScore Int?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  // Relations
  organizerId String
  organizer   User   @relation("GameOrganizer", fields: [organizerId], references: [id])
  
  courtId String
  court   Court  @relation(fields: [courtId], references: [id])
  
  hostTeamId     String?
  hostTeam       Team?   @relation("HostTeam", fields: [hostTeamId], references: [id])
  
  opponentTeamId String?
  opponentTeam   Team?   @relation("OpponentTeam", fields: [opponentTeamId], references: [id])
  
  participants GameParticipant[]

  @@map("games")
}

model GameParticipant {
  id       String @id @default(cuid())
  joinedAt DateTime @default(now())

  // Relations
  gameId String
  game   Game   @relation(fields: [gameId], references: [id], onDelete: Cascade)
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([gameId, userId])
  @@map("game_participants")
}

model Court {
  id          String    @id @default(cuid())
  name        String
  address     String
  latitude    Float
  longitude   Float
  courtType   CourtType
  surfaceType String?
  hasLighting Boolean   @default(false)
  hasParking  Boolean   @default(false)
  rating      Float     @default(0)
  reviewCount Int       @default(0)
  isVerified  Boolean   @default(false)
  amenities   String[]  @default([])
  photos      String[]  @default([])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  games   Game[]
  reviews CourtReview[]

  @@map("courts")
}

model CourtReview {
  id        String   @id @default(cuid())
  rating    Int      // 1-5 stars
  comment   String?
  createdAt DateTime @default(now())

  // Relations
  courtId String
  court   Court  @relation(fields: [courtId], references: [id], onDelete: Cascade)
  userId  String
  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([courtId, userId])
  @@map("court_reviews")
}

enum Position {
  PG // Point Guard
  SG // Shooting Guard
  SF // Small Forward
  PF // Power Forward
  C  // Center
}

enum Role {
  CAPTAIN
  CO_CAPTAIN
  MEMBER
}

enum GameType {
  PICKUP
  SCRIMMAGE
  PRACTICE
  TOURNAMENT
}

enum GameStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum CourtType {
  INDOOR
  OUTDOOR
}
```

### Step 2: Database Connection
**File: `laro-app/lib/db.ts`**

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Step 3: Environment Setup
**File: `laro-app/.env.local`**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/larohub"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"
```

### Step 4: Package Installation
```bash
cd laro-app
npm install prisma @prisma/client bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### Step 5: Database Migration
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🔐 Task 1.2: Authentication System

### Step 1: JWT Utilities
**File: `laro-app/lib/auth.ts`**

```typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export interface JWTPayload {
  userId: string
  email: string
  username: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  
  return verifyToken(token)
}
```

### Step 2: Real Login Endpoint
**File: `laro-app/app/api/auth/login/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    })

    // Return user data and token
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          rating: user.rating,
          skillLevel: user.skillLevel,
          position: user.position
        },
        token
      },
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 🔧 Task 1.3: Core API Endpoints

### User Profile Endpoint
**File: `laro-app/app/api/users/me/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        position: true,
        skillLevel: true,
        rating: true,
        city: true,
        isVerified: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      data: userData
    })

  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## 📝 Implementation Notes

### Database Setup
1. Install PostgreSQL locally or use a cloud service
2. Create database and update connection string
3. Run migrations to create tables
4. Verify connection with Prisma Studio: `npx prisma studio`

### Authentication Flow
1. User submits login form
2. API validates credentials against database
3. JWT token generated and returned
4. Frontend stores token and includes in API requests
5. Protected routes verify token before processing

### Next Steps
After completing Phase 1, the app will have:
- Real user registration and login
- Data persistence in PostgreSQL
- Protected API endpoints
- Foundation for all CRUD operations

**Estimated Time: 1-2 weeks**
**Priority: Complete before any other features**
