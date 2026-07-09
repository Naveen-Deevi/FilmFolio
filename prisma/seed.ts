import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Insert basic lookups
  const professions = ['Actor', 'Director', 'Producer', 'Screenwriter', 'Editor', 'Cinematographer', 'Photographer', 'VFX Artist', 'Sound Designer', 'Music Composer', 'Production Crew', 'Equipment Owner']
  for (const name of professions) {
    await prisma.profession.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  }

  const projectCategories = ['Feature Film', 'Short Film', 'Documentary', 'Advertisement', 'Music Video', 'Web Series']
  for (const name of projectCategories) {
    await prisma.projectCategory.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  }

  const equipmentCategories = ['Camera', 'Lens', 'Drone', 'Gimbal', 'Lighting', 'Audio', 'Tripod']
  for (const name of equipmentCategories) {
    await prisma.equipmentCategory.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  }

  console.log('Lookup tables seeded.')

  // Optional: Add some mock users if needed
  const mockUser = await prisma.user.upsert({
    where: { email: 'demo@filmfolio.app' },
    update: {},
    create: {
      email: 'demo@filmfolio.app',
      username: 'demouser',
      fullName: 'Demo User',
      isVerified: true,
      bio: 'A passionate filmmaker and equipment owner.'
    }
  })

  console.log('Mock user seeded:', mockUser.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
