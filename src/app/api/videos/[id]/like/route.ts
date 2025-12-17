import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST - Like a video
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const videoId = parseInt(idParam)
    
    if (isNaN(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID' },
        { status: 400 }
      )
    }

    // Get device ID from request body
    const body = await request.json()
    const deviceId = body.deviceId

    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      )
    }

    // Check if user already liked this video
    const existingLike = await prisma.videoLike.findUnique({
      where: {
        videoId_deviceId: {
          videoId,
          deviceId
        }
      }
    })

    if (existingLike) {
      // Unlike - remove the like
      await prisma.videoLike.delete({
        where: { id: existingLike.id }
      })

      // Update likes count and get updated video
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      })

      return NextResponse.json({ 
        message: 'Video unliked',
        liked: false,
        likesCount: updatedVideo.likesCount
      })
    } else {
      // Like - add new like
      await prisma.videoLike.create({
        data: {
          videoId,
          deviceId
        }
      })

      // Update likes count and get updated video
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
          likesCount: {
            increment: 1
          }
        }
      })

      return NextResponse.json({ 
        message: 'Video liked',
        liked: true,
        likesCount: updatedVideo.likesCount
      })
    }
  } catch (error) {
    console.error('Error liking video:', error)
    return NextResponse.json(
      { error: 'Failed to like video' },
      { status: 500 }
    )
  }
}

// GET - Check if user liked this video
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const videoId = parseInt(idParam)
    
    if (isNaN(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID' },
        { status: 400 }
      )
    }

    // Get device ID from query parameters
    const { searchParams } = new URL(request.url)
    const deviceId = searchParams.get('deviceId')

    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID is required' },
        { status: 400 }
      )
    }

    // Check if user liked this video
    const existingLike = await prisma.videoLike.findUnique({
      where: {
        videoId_deviceId: {
          videoId,
          deviceId
        }
      }
    })

    return NextResponse.json({ 
      liked: !!existingLike 
    })
  } catch (error) {
    console.error('Error checking like status:', error)
    return NextResponse.json(
      { error: 'Failed to check like status' },
      { status: 500 }
    )
  }
}
