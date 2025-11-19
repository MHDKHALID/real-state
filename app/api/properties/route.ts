import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().positive(),
  sqft: z.number().positive(),
  type: z.enum(['HOUSE', 'APARTMENT', 'CONDO', 'LAND', 'COMMERCIAL']),
  status: z.enum(['AVAILABLE', 'SOLD', 'RENTED', 'PENDING']).default('AVAILABLE'),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const city = searchParams.get('city')

    const properties = await prisma.property.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(type && { type: type as any }),
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        ratings: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const propertiesWithAvgRating = properties.map((property) => {
      const avgRating =
        property.ratings.length > 0
          ? property.ratings.reduce((sum, r) => sum + r.rating, 0) / property.ratings.length
          : 0
      return {
        ...property,
        averageRating: avgRating,
        ratingsCount: property.ratings.length,
        ratings: undefined,
      }
    })

    return NextResponse.json({ properties: propertiesWithAvgRating })
  } catch (error) {
    console.error('Get properties error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()

    if (session.role !== 'AGENT' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const data = propertySchema.parse(body)

    const property = await prisma.property.create({
      data: {
        ...data,
        agentId: session.userId as string,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error('Create property error:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
