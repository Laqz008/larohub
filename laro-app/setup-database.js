const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function setupDatabase() {
  console.log('🐘 Setting up PostgreSQL database for LaroHub...\n');

  try {
    // Check if Docker is running
    console.log('1. Checking Docker status...');
    await execAsync('docker --version');
    console.log('✅ Docker is available\n');

    // Check if PostgreSQL container exists
    console.log('2. Checking for existing PostgreSQL container...');
    try {
      const { stdout } = await execAsync('docker ps -a --filter name=laro-postgres --format "{{.Names}}"');
      
      if (stdout.trim() === 'laro-postgres') {
        console.log('📦 Found existing laro-postgres container');
        
        // Check if it's running
        const { stdout: runningCheck } = await execAsync('docker ps --filter name=laro-postgres --format "{{.Names}}"');
        
        if (runningCheck.trim() === 'laro-postgres') {
          console.log('✅ PostgreSQL container is already running\n');
        } else {
          console.log('🔄 Starting existing PostgreSQL container...');
          await execAsync('docker start laro-postgres');
          console.log('✅ PostgreSQL container started\n');
        }
      } else {
        throw new Error('Container not found');
      }
    } catch (error) {
      // Container doesn't exist, create it
      console.log('📦 Creating new PostgreSQL container...');
      await execAsync(`docker run --name laro-postgres \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_DB=laro_dev \
        -p 5433:5432 \
        -d postgres:15`);
      console.log('✅ PostgreSQL container created and started\n');
      
      // Wait a moment for PostgreSQL to initialize
      console.log('⏳ Waiting for PostgreSQL to initialize...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    // Test connection
    console.log('3. Testing database connection...');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful!\n');
      
      // Check if we need to run migrations
      try {
        await prisma.user.count();
        console.log('✅ Database tables exist');
      } catch (error) {
        console.log('⚠️  Database tables not found - running migrations...');
        await execAsync('npx prisma migrate dev --name init');
        console.log('✅ Database migrations completed');
      }
      
      await prisma.$disconnect();
      
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      return;
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run db:seed (to populate with sample data)');
    console.log('2. Run: npm run dev (to start the development server)');
    console.log('\n🔗 Database connection details:');
    console.log('Host: localhost');
    console.log('Port: 5433');
    console.log('Database: laro_dev');
    console.log('Username: postgres');
    console.log('Password: password');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure Docker Desktop is running');
    console.log('2. Check if port 5433 is available');
    console.log('3. Try running: docker stop laro-postgres && docker rm laro-postgres');
  }
}

setupDatabase();
