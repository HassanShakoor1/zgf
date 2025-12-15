const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_7uELg0ODjGWF@ep-wild-wildflower-a4v8g5xy-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

async function main() {
  // Create sample goats
  const goat1 = await prisma.goat.create({
    data: {
      name: "Sultan",
      breed: "Rajanpuri",
      age: "2 years",
      weight: "45 kg",
      price: 85000,
      description: "Premium Rajanpuri goat, excellent for Eid sacrifice. Healthy and well-maintained.",
      imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=400&fit=crop",
      isAvailable: true,
      gender: "Male",
      color: "Brown",
      healthStatus: "Excellent"
    }
  })

  const goat2 = await prisma.goat.create({
    data: {
      name: "Shahzada",
      breed: "Maaki Cheena",
      age: "1.5 years",
      weight: "38 kg", 
      price: 65000,
      description: "Beautiful Maaki Cheena goat with excellent genetics. Perfect for breeding or sacrifice.",
      imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=400&fit=crop",
      isAvailable: true,
      gender: "Male",
      color: "White",
      healthStatus: "Excellent"
    }
  })

  const goat3 = await prisma.goat.create({
    data: {
      name: "Malka",
      breed: "Rajanpuri", 
      age: "3 years",
      weight: "52 kg",
      price: 95000,
      description: "Large Rajanpuri goat, ideal for big families. Excellent meat quality and health.",
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=400&fit=crop",
      isAvailable: true,
      gender: "Male",
      color: "Black",
      healthStatus: "Excellent"
    }
  })

  console.log('Sample goats created:', { goat1, goat2, goat3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
