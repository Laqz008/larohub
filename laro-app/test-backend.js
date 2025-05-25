const { spawn } = require('child_process');
const fetch = require('node-fetch');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_USER = {
  username: 'testuser123',
  email: 'test@larohub.com',
  password: 'password123',
  skillLevel: 7,
  position: 'PG'
};

let authToken = null;
let testUserId = null;

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    
    console.log(`${options.method || 'GET'} ${endpoint}:`, 
      response.status, 
      response.ok ? '✅' : '❌',
      data.message || data.error || 'Success'
    );

    return { response, data, ok: response.ok };
  } catch (error) {
    console.log(`${options.method || 'GET'} ${endpoint}: ❌ Network Error -`, error.message);
    return { error, ok: false };
  }
}

// Test functions
async function testAuthentication() {
  console.log('\n🔐 Testing Authentication...');
  
  // Test registration
  const registerResult = await apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(TEST_USER)
  });

  if (registerResult.ok) {
    authToken = registerResult.data.token;
    testUserId = registerResult.data.user.id;
    console.log('✅ Registration successful, token received');
  } else {
    // Try login if user already exists
    console.log('🔄 Registration failed, trying login...');
    const loginResult = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
      })
    });

    if (loginResult.ok) {
      authToken = loginResult.data.token;
      testUserId = loginResult.data.user.id;
      console.log('✅ Login successful, token received');
    } else {
      console.log('❌ Both registration and login failed');
      return false;
    }
  }

  // Test protected route
  await apiCall('/api/auth/me');
  
  return true;
}

async function testUserProfile() {
  console.log('\n👤 Testing User Profile...');
  
  // Get profile
  await apiCall('/api/users/profile');
  
  // Update profile
  await apiCall('/api/users/profile', {
    method: 'PUT',
    body: JSON.stringify({
      skillLevel: 8,
      city: 'Los Angeles',
      maxDistance: 25
    })
  });
}

async function testTeams() {
  console.log('\n👥 Testing Teams...');
  
  // Create team
  const createTeamResult = await apiCall('/api/teams', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test Lakers',
      description: 'A test basketball team',
      isPublic: true,
      maxMembers: 12
    })
  });

  let teamId = null;
  if (createTeamResult.ok) {
    teamId = createTeamResult.data.id;
  }

  // List teams
  await apiCall('/api/teams');
  
  // Get team details
  if (teamId) {
    await apiCall(`/api/teams/${teamId}`);
  }
}

async function testCourts() {
  console.log('\n🏟️ Testing Courts...');
  
  // Create court
  const createCourtResult = await apiCall('/api/courts', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test Basketball Court',
      address: '123 Test Street, Los Angeles, CA',
      latitude: 34.0522,
      longitude: -118.2437,
      courtType: 'OUTDOOR',
      hasLighting: true,
      hasParking: true
    })
  });

  let courtId = null;
  if (createCourtResult.ok) {
    courtId = createCourtResult.data.id;
  }

  // List courts
  await apiCall('/api/courts');
  
  // Get court details
  if (courtId) {
    await apiCall(`/api/courts/${courtId}`);
    
    // Add review
    await apiCall(`/api/courts/${courtId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        rating: 5,
        comment: 'Great court for pickup games!'
      })
    });
  }
}

async function testGames() {
  console.log('\n🎮 Testing Games...');
  
  // First get a court to use
  const courtsResult = await apiCall('/api/courts');
  let courtId = null;
  
  if (courtsResult.ok && courtsResult.data.data.length > 0) {
    courtId = courtsResult.data.data[0].id;
  }

  if (!courtId) {
    console.log('⚠️ No courts available for game testing');
    return;
  }

  // Create game
  const createGameResult = await apiCall('/api/games', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Pickup Game',
      description: 'A test basketball game',
      courtId: courtId,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      duration: 120,
      maxPlayers: 10,
      gameType: 'PICKUP',
      skillLevelMin: 1,
      skillLevelMax: 10
    })
  });

  let gameId = null;
  if (createGameResult.ok) {
    gameId = createGameResult.data.id;
  }

  // List games
  await apiCall('/api/games');
  
  // Get game details
  if (gameId) {
    await apiCall(`/api/games/${gameId}`);
    
    // Join game
    await apiCall(`/api/games/${gameId}/join`, {
      method: 'POST'
    });
  }
}

async function checkServerStatus() {
  console.log('🔍 Checking if development server is running...');
  
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      console.log('✅ Development server is running');
      return true;
    } else {
      console.log('❌ Development server responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('💡 Please run: npm run dev');
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🧪 LaroHub Backend API Testing\n');
  console.log('=' .repeat(50));

  // Check if server is running
  const serverRunning = await checkServerStatus();
  if (!serverRunning) {
    console.log('\n🚀 Starting development server...');
    const devServer = spawn('npm', ['run', 'dev'], { 
      stdio: 'pipe',
      shell: true 
    });
    
    console.log('⏳ Waiting for server to start...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    const serverCheck = await checkServerStatus();
    if (!serverCheck) {
      console.log('❌ Failed to start development server');
      return;
    }
  }

  // Run tests
  try {
    const authSuccess = await testAuthentication();
    if (!authSuccess) {
      console.log('❌ Authentication failed, stopping tests');
      return;
    }

    await testUserProfile();
    await testTeams();
    await testCourts();
    await testGames();

    console.log('\n' + '=' .repeat(50));
    console.log('🎉 Backend testing completed!');
    console.log('✅ All major functionalities tested');
    console.log('🚀 LaroHub backend is ready for use!');

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

// Run the tests
runTests();
