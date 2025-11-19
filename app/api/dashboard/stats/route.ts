import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth()

    if (session.role !== 'ADMIN' && session.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const totalProperties = await prisma.property.count()
    const totalCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    })
    const totalAgents = await prisma.user.count({
      where: { role: 'AGENT' },
    })

    const properties = await prisma.property.findMany({
      include: {
        ratings: true,
      },
    })

    const totalRevenue = properties
      .filter((p) => p.status === 'SOLD')
      .reduce((sum, p) => sum + p.price, 0)

    const recentProperties = await prisma.property.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        agent: {
          select: {
            name: true,
          },
        },
      },
    })

    const recentRatings = await prisma.rating.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        property: {
          select: {
            title: true,
          },
        },
      },
    })

    const propertyByStatus = await prisma.property.groupBy({
      by: ['status'],
      _count: true,
    })

    const propertyByType = await prisma.property.groupBy({
      by: ['type'],
      _count: true,
    })

    return NextResponse.json({
      stats: {
        totalProperties,
        totalCustomers,
        totalAgents,
        totalRevenue,
      },
      recentProperties,
      recentRatings,
      propertyByStatus,
      propertyByType,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
