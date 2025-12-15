const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_7uELg0ODjGWF@ep-wild-wildflower-a4v8g5xy-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

async function checkGoats() {
  try {
    const goats = await prisma.goat.findMany()
    
    console.log('=== GOATS IN DATABASE ===')
    goats.forEach((goat, index) => {
      console.log(`\n${index + 1}. ${goat.name} (${goat.breed})`)
      console.log(`   ID: ${goat.id}`)
      console.log(`   imageUrl: ${goat.imageUrl}`)
      console.log(`   description: ${goat.description}`)
      console.log(`   imageUrls field exists: ${goat.imageUrls !== undefined}`)
      if (goat.imageUrls) {
        console.log(`   imageUrls: ${JSON.stringify(goat.imageUrls)}`)
      }
    })
    
    console.log(`\nTotal goats: ${goats.length}`)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkGoats()
