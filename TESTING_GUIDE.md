# 🧪 LaroHub Backend Testing Guide

## 🎯 **TESTING OVERVIEW**

This guide will help you test all the implemented backend functionalities to verify that the LaroHub application is working with real data instead of mock data.

## 🚀 **QUICK START TESTING**

### Step 1: Database Setup (Choose One Option)

#### Option A: SQLite (Recommended for Testing)
```bash
# 1. Update environment for SQLite
# Already configured in .env.local

# 2. Setup database
npx prisma db push

# 3. Generate Prisma client
npx prisma generate
```

#### Option B: PostgreSQL with Docker
```bash
# 1. Start PostgreSQL container
docker run --name laro-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=laro_dev -p 5433:5432 -d postgres:15

# 2. Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5433/laro_dev"

# 3. Update prisma/schema.prisma
provider = "postgresql"

# 4. Run migrations
npx prisma db push
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Application
Visit: `http://localhost:3000`

## 🔍 **MANUAL TESTING CHECKLIST**

### ✅ **Authentication Testing**

1. **User Registration**
   - Go to registration page
   - Create account with:
     - Username: `testuser123`
     - Email: `test@larohub.com`
     - Password: `password123`
     - Skill Level: `7`
   - ✅ Should redirect to dashboard with real user data

2. **User Login**
   - Logout and login with same credentials
   - ✅ Should maintain session and show user profile

3. **Profile Management**
   - Update profile information
   - Change skill level, location, preferences
   - ✅ Changes should persist after page refresh

### ✅ **Teams Testing**

1. **Create Team**
   - Navigate to Teams section
   - Create new team:
     - Name: `Test Lakers`
     - Description: `A test basketball team`
     - Make it public
   - ✅ Team should appear in teams list

2. **Team Management**
   - View team details
   - Edit team information
   - ✅ Changes should be saved and visible

3. **Team Membership**
   - Create second user account
   - Join the team with second user
   - ✅ Team should show multiple members

### ✅ **Courts Testing**

1. **Create Court**
   - Navigate to Courts section
   - Add new court:
     - Name: `Test Basketball Court`
     - Address: `123 Test Street, Los Angeles, CA`
     - Type: `Outdoor`
     - Add amenities (lighting, parking)
   - ✅ Court should appear in courts list

2. **Court Reviews**
   - View court details
   - Add review with rating and comment
   - ✅ Review should appear on court page

3. **Location Search**
   - Search for courts near your location
   - ✅ Should show distance-based results

### ✅ **Games Testing**

1. **Create Game**
   - Navigate to Games section
   - Create new game:
     - Title: `Test Pickup Game`
     - Select a court
     - Set future date/time
     - Set max players: `10`
   - ✅ Game should appear in games list

2. **Game Participation**
   - Join the game you created
   - ✅ Should show you as participant

3. **Game Management**
   - Edit game details
   - Update time or description
   - ✅ Changes should be saved

### ✅ **Data Persistence Testing**

1. **Refresh Test**
   - Create some data (team, game, court)
   - Refresh the page
   - ✅ All data should still be there

2. **Cross-Session Test**
   - Close browser completely
   - Reopen and login
   - ✅ All your data should be preserved

3. **Multiple Users Test**
   - Create multiple user accounts
   - Have them interact (join teams, games)
   - ✅ All interactions should be saved

## 🔧 **API ENDPOINT TESTING**

### Using Browser Developer Tools

1. **Open Developer Tools** (F12)
2. **Go to Network Tab**
3. **Perform actions in the app**
4. **Check API calls:**

#### Expected API Calls:
```
✅ POST /api/auth/register - User registration
✅ POST /api/auth/login - User login
✅ GET /api/auth/me - Get current user
✅ GET /api/teams - List teams
✅ POST /api/teams - Create team
✅ GET /api/games - List games
✅ POST /api/games - Create game
✅ GET /api/courts - List courts
✅ POST /api/courts - Create court
✅ PUT /api/users/profile - Update profile
```

### Using cURL (Advanced)

```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","skillLevel":5}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected route (use token from login)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🎯 **SUCCESS CRITERIA**

### ✅ **All Tests Pass When:**

1. **No Mock Data Visible**
   - No placeholder text like "Sample Team" or "Mock Game"
   - All data comes from your inputs

2. **Data Persistence**
   - Information survives page refreshes
   - Data remains after browser restart

3. **Real-time Updates**
   - Changes appear immediately
   - Multiple users see each other's actions

4. **API Responses**
   - Network tab shows real API calls
   - No 404 errors for API endpoints
   - Proper JSON responses

5. **Database Integration**
   - SQLite file `dev.db` is created
   - Contains your actual data

## 🐛 **Troubleshooting**

### Common Issues:

1. **Database Connection Error**
   ```
   Solution: Ensure DATABASE_URL is correct in .env.local
   ```

2. **Prisma Client Error**
   ```bash
   Solution: Run npx prisma generate
   ```

3. **API 404 Errors**
   ```
   Solution: Check if all API route files exist
   ```

4. **Authentication Issues**
   ```
   Solution: Check JWT_SECRET in .env.local
   ```

## 🎉 **TESTING COMPLETE**

When all tests pass, you have successfully verified that:

- ✅ **LaroHub backend is fully functional**
- ✅ **All mock data has been replaced with real APIs**
- ✅ **Database integration is working**
- ✅ **Authentication system is secure**
- ✅ **All CRUD operations work correctly**
- ✅ **Application is ready for production**

---

**🏀 Congratulations! LaroHub is now running with a complete, production-ready backend!**
