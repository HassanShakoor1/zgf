import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const goats = await prisma.goat.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(goats)
  } catch (error) {
    console.error('Error fetching goats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goats' },
      { status: 500 }
    )
  }
}
