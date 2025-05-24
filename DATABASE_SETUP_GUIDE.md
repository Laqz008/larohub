# 🗄️ Database Setup Guide - LaroHub

## Overview
This guide will help you set up PostgreSQL database and complete the backend infrastructure for LaroHub basketball platform.

## 📋 Prerequisites

### 1. Install PostgreSQL
Choose one of these options:

#### Option A: Local PostgreSQL Installation
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql` or download from postgresql.org
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

#### Option B: Docker PostgreSQL (Recommended)
```bash
# Create and run PostgreSQL container
docker run --name larohub-postgres \
  -e POSTGRES_DB=larohub \
  -e POSTGRES_USER=larohub_user \
  -e POSTGRES_PASSWORD=larohub_password \
  -p 5432:5432 \
  -d postgres:15

# Verify container is running
docker ps
```

#### Option C: Cloud Database (Easiest)
- **Supabase**: Free PostgreSQL database at [supabase.com](https://supabase.com)
- **Railway**: Free PostgreSQL at [railway.app](https://railway.app)
- **Neon**: Free PostgreSQL at [neon.tech](https://neon.tech)

## 🔧 Setup Steps

### Step 1: Update Environment Variables
Edit `laro-app/.env.local` and update the DATABASE_URL:

```env
# For local PostgreSQL
DATABASE_URL="postgresql://larohub_user:larohub_password@localhost:5432/larohub"

# For cloud database, use the connection string provided by your service
DATABASE_URL="postgresql://username:password@host:port/database"
```

### Step 2: Run Database Migration
```bash
cd laro-app
npm run db:migrate
```

This will:
- Create all database tables
- Set up relationships and constraints
- Generate Prisma client

### Step 3: Seed Database with Demo Data
```bash
npm run db:seed
```

This will create:
- 3 demo users (including `courtking@example.com`)
- 3 basketball courts
- 2 teams with members
- Sample games and reviews

### Step 4: Verify Database Setup
```bash
npm run db:studio
```

This opens Prisma Studio in your browser to view and manage database data.

## 🧪 Test Authentication

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Test Registration
1. Go to `http://localhost:3000/auth/register`
2. Create a new account
3. Verify you're redirected to dashboard

### Step 3: Test Login
1. Go to `http://localhost:3000/auth/login`
2. Use demo account:
   - **Email**: `courtking@example.com`
   - **Password**: `password123`
3. Verify you're logged in and see real data

## 🔍 Verification Checklist

### Database Connection
- [ ] PostgreSQL is running
- [ ] Database connection string is correct
- [ ] Migration completed successfully
- [ ] Seed data is loaded

### Authentication
- [ ] Registration creates new users
- [ ] Login works with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] User data persists after page refresh
- [ ] Protected routes require authentication

### Data Persistence
- [ ] User profiles can be viewed
- [ ] Teams show real data from database
- [ ] Courts display seeded court information
- [ ] Games show scheduled games

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
# For local installation:
sudo service postgresql status  # Linux
brew services list | grep postgresql  # macOS

# For Docker:
docker ps | grep postgres
```

### Migration Errors
```bash
# Reset database and start fresh
npm run db:reset

# Then re-run migration and seed
npm run db:migrate
npm run db:seed
```

### Authentication Issues
1. Check JWT_SECRET is set in `.env.local`
2. Verify database has users table
3. Check browser console for errors
4. Verify API endpoints return correct responses

## 📊 Database Schema Overview

### Core Tables
- **users**: User accounts and profiles
- **teams**: Basketball teams
- **team_members**: Team membership and roles
- **games**: Scheduled games and matches
- **game_participants**: Game participation
- **courts**: Basketball court locations
- **court_reviews**: User reviews of courts

### Key Relationships
- Users can captain multiple teams
- Users can be members of multiple teams
- Games are played at specific courts
- Games can have team vs team or pickup format
- Users can review courts they've played at

## 🎯 Next Steps

Once database setup is complete:

1. **Test Core Functionality**
   - User registration and login
   - Team creation and management
   - Game scheduling
   - Court discovery

2. **Phase 2 Implementation**
   - Connect all forms to real backend
   - Implement CRUD operations
   - Add real-time features

3. **Data Validation**
   - Form validation with error handling
   - Input sanitization
   - Business logic enforcement

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Ensure PostgreSQL is running and accessible
4. Check the console for error messages

**Database setup is critical for the app to function. All subsequent features depend on this foundation.**
