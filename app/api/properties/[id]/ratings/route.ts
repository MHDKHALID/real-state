import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth()
    const body = await req.json()
    const data = ratingSchema.parse(body)

    const property = await prisma.property.findUnique({
      where: { id: params.id },
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        propertyId_customerId: {
          propertyId: params.id,
          customerId: session.userId as string,
        },
      },
    })

    let rating
    if (existingRating) {
      rating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: {
          rating: data.rating,
          comment: data.comment,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    } else {
      rating = await prisma.rating.create({
        data: {
          rating: data.rating,
          comment: data.comment,
          propertyId: params.id,
          customerId: session.userId as string,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    }

    return NextResponse.json({ rating }, { status: 201 })
  } catch (error) {
    console.error('Create rating error:', error)
    return NextResponse.json(
      { error: 'Failed to create rating' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ratings = await prisma.rating.findMany({
      where: { propertyId: params.id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0

    return NextResponse.json({
      ratings,
      averageRating: avgRating,
      totalRatings: ratings.length,
    })
  } catch (error) {
    console.error('Get ratings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}
