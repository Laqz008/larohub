import { PrismaClient, Position, GameType, GameStatus, CourtType } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo users
  const hashedPassword = await hashPassword('password123')

  const user1 = await prisma.user.upsert({
    where: { email: 'courtking@example.com' },
    update: {},
    create: {
      email: 'courtking@example.com',
      username: 'CourtKing23',
      password: hashedPassword,
      position: Position.PG,
      skillLevel: 8,
      rating: 1847,
      latitude: 34.0522,
      longitude: -118.2437,
      city: 'Los Angeles',
      isVerified: true,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'hoopstar@example.com' },
    update: {},
    create: {
      email: 'hoopstar@example.com',
      username: 'HoopStar',
      password: hashedPassword,
      position: Position.SG,
      skillLevel: 7,
      rating: 1654,
      latitude: 34.0689,
      longitude: -118.4452,
      city: 'Los Angeles',
      isVerified: true,
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'ballhandler@example.com' },
    update: {},
    create: {
      email: 'ballhandler@example.com',
      username: 'BallHandler',
      password: hashedPassword,
      position: Position.SF,
      skillLevel: 9,
      rating: 2156,
      latitude: 33.9850,
      longitude: -118.4695,
      city: 'Venice',
      isVerified: true,
    },
  })

  console.log('✅ Created demo users')

  // Create courts
  const court1 = await prisma.court.upsert({
    where: { id: 'court-1' },
    update: {},
    create: {
      id: 'court-1',
      name: 'Venice Beach Basketball Courts',
      address: '1800 Ocean Front Walk, Venice, CA 90291',
      latitude: 33.9850,
      longitude: -118.4695,
      courtType: CourtType.OUTDOOR,
      surfaceType: 'Asphalt',
      hasLighting: true,
      hasParking: true,
      rating: 4.5,
      reviewCount: 127,
      isVerified: true,
      amenities: ['Restrooms', 'Water Fountain', 'Nearby Food', 'Beach Access'],
      photos: ['/courts/venice-1.jpg', '/courts/venice-2.jpg'],
      createdBy: { connect: { id: user1.id } }
    },
  })

  const court2 = await prisma.court.upsert({
    where: { id: 'court-2' },
    update: {},
    create: {
      id: 'court-2',
      name: 'Downtown Athletic Club',
      address: '123 S Figueroa St, Los Angeles, CA 90015',
      latitude: 34.0522,
      longitude: -118.2437,
      courtType: CourtType.INDOOR,
      surfaceType: 'Hardwood',
      hasLighting: true,
      hasParking: true,
      rating: 4.8,
      reviewCount: 89,
      isVerified: true,
      amenities: ['Locker Rooms', 'Showers', 'Pro Shop', 'Cafe', 'Air Conditioning'],
      photos: ['/courts/downtown-1.jpg', '/courts/downtown-2.jpg'],
      createdBy: { connect: { id: user2.id } }
    },
  })

  const court3 = await prisma.court.upsert({
    where: { id: 'court-3' },
    update: {},
    create: {
      id: 'court-3',
      name: 'UCLA Recreation Center',
      address: '221 Westwood Plaza, Los Angeles, CA 90095',
      latitude: 34.0689,
      longitude: -118.4452,
      courtType: CourtType.INDOOR,
      surfaceType: 'Hardwood',
      hasLighting: true,
      hasParking: true,
      rating: 4.7,
      reviewCount: 67,
      isVerified: true,
      amenities: ['Student Discounts', 'Equipment Rental', 'Fitness Center', 'Pool'],
      photos: ['/courts/ucla-1.jpg', '/courts/ucla-2.jpg'],
      createdBy: { connect: { id: user3.id } }
    },
  })

  console.log('✅ Created demo courts')

  // Create teams
  const team1 = await prisma.team.upsert({
    where: { id: 'team-1' },
    update: {},
    create: {
      id: 'team-1',
      name: 'Thunder Bolts',
      description: 'Competitive team looking for skilled players. We practice twice a week and compete in local tournaments.',
      maxSize: 12,
      minSkillLevel: 6,
      maxSkillLevel: 10,
      isPublic: true,
      rating: 1892,
      gamesPlayed: 45,
      wins: 32,
      captain: { connect: { id: user1.id } }
    },
  })

  const team2 = await prisma.team.upsert({
    where: { id: 'team-2' },
    update: {},
    create: {
      id: 'team-2',
      name: 'Street Warriors',
      description: 'Casual team for weekend games. All skill levels welcome!',
      maxSize: 10,
      minSkillLevel: 4,
      maxSkillLevel: 8,
      isPublic: true,
      rating: 1654,
      gamesPlayed: 28,
      wins: 18,
      captain: { connect: { id: user2.id } }
    },
  })

  console.log('✅ Created demo teams')

  // Add team members
  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team1.id, userId: user1.id } },
    update: {},
    create: {
      teamId: team1.id,
      userId: user1.id,
      role: 'CAPTAIN',
      position: Position.PG,
      isStarter: true,
    },
  })

  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team2.id, userId: user2.id } },
    update: {},
    create: {
      teamId: team2.id,
      userId: user2.id,
      role: 'CAPTAIN',
      position: Position.SG,
      isStarter: true,
    },
  })

  console.log('✅ Created team memberships')

  // Create games
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(18, 0, 0, 0)

  const game1 = await prisma.game.upsert({
    where: { id: 'game-1' },
    update: {},
    create: {
      id: 'game-1',
      title: 'Friday Night Pickup',
      description: 'Competitive pickup game. All skill levels welcome! Bring your A-game.',
      gameType: GameType.PICKUP,
      status: GameStatus.SCHEDULED,
      scheduledAt: tomorrow,
      duration: 120,
      maxPlayers: 10,
      skillLevelMin: 4,
      skillLevelMax: 8,
      isPrivate: false,
      organizer: { connect: { id: user1.id } },
      court: { connect: { id: court1.id } },
      hostTeam: { connect: { id: team1.id } }
    },
  })

  console.log('✅ Created demo games')

  // Create court reviews
  await prisma.courtReview.upsert({
    where: { courtId_userId: { courtId: court1.id, userId: user2.id } },
    update: {},
    create: {
      courtId: court1.id,
      userId: user2.id,
      rating: 5,
      comment: 'Amazing courts with great ocean views! Perfect for pickup games.',
    },
  })

  await prisma.courtReview.upsert({
    where: { courtId_userId: { courtId: court2.id, userId: user3.id } },
    update: {},
    create: {
      courtId: court2.id,
      userId: user3.id,
      rating: 5,
      comment: 'Professional quality indoor courts. Great for serious training.',
    },
  })

  console.log('✅ Created court reviews')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
