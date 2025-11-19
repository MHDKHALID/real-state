import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@realstate.com' },
    update: {},
    create: {
      email: 'admin@realstate.com',
      password: adminPassword,
      name: 'Admin User',
      phone: '+1 (555) 001-0001',
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create agent users
  const agent1Password = await hashPassword('agent123')
  const agent1 = await prisma.user.upsert({
    where: { email: 'john.smith@realstate.com' },
    update: {},
    create: {
      email: 'john.smith@realstate.com',
      password: agent1Password,
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      role: 'AGENT',
    },
  })
  console.log('✅ Created agent user:', agent1.email)

  const agent2Password = await hashPassword('agent123')
  const agent2 = await prisma.user.upsert({
    where: { email: 'sarah.johnson@realstate.com' },
    update: {},
    create: {
      email: 'sarah.johnson@realstate.com',
      password: agent2Password,
      name: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      role: 'AGENT',
    },
  })
  console.log('✅ Created agent user:', agent2.email)

  // Create customer users
  const customer1Password = await hashPassword('customer123')
  const customer1 = await prisma.user.upsert({
    where: { email: 'mike.wilson@example.com' },
    update: {},
    create: {
      email: 'mike.wilson@example.com',
      password: customer1Password,
      name: 'Mike Wilson',
      phone: '+1 (555) 345-6789',
      role: 'CUSTOMER',
    },
  })
  console.log('✅ Created customer user:', customer1.email)

  const customer2Password = await hashPassword('customer123')
  const customer2 = await prisma.user.upsert({
    where: { email: 'emily.brown@example.com' },
    update: {},
    create: {
      email: 'emily.brown@example.com',
      password: customer2Password,
      name: 'Emily Brown',
      phone: '+1 (555) 456-7890',
      role: 'CUSTOMER',
    },
  })
  console.log('✅ Created customer user:', customer2.email)

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      title: 'Luxury Modern Villa with Ocean View',
      description: 'Stunning 5-bedroom luxury villa featuring panoramic ocean views, infinity pool, modern architecture, and high-end finishes throughout. Perfect for those seeking coastal luxury living.',
      price: 2500000,
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4500,
      type: 'HOUSE',
      status: 'AVAILABLE',
      images: [],
      features: ['Ocean View', 'Infinity Pool', 'Smart Home', 'Gourmet Kitchen', 'Home Theater', 'Wine Cellar'],
      agentId: agent1.id,
    },
  })
  console.log('✅ Created property:', property1.title)

  const property2 = await prisma.property.create({
    data: {
      title: 'Downtown Penthouse Suite',
      description: 'Spectacular penthouse in the heart of downtown with floor-to-ceiling windows, modern amenities, and breathtaking city skyline views. Building features 24/7 concierge and rooftop terrace.',
      price: 1800000,
      address: '456 Metropolitan Ave, Unit PH-1',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90012',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      type: 'CONDO',
      status: 'AVAILABLE',
      images: [],
      features: ['City View', 'Concierge', 'Rooftop Access', 'Gym', 'Secure Parking', 'Smart Home'],
      agentId: agent2.id,
    },
  })
  console.log('✅ Created property:', property2.title)

  const property3 = await prisma.property.create({
    data: {
      title: 'Charming Family Home in Suburbs',
      description: 'Beautiful 4-bedroom family home in quiet neighborhood. Features spacious backyard, updated kitchen, hardwood floors, and close to top-rated schools. Perfect for growing families.',
      price: 850000,
      address: '789 Maple Street',
      city: 'Pasadena',
      state: 'CA',
      zipCode: '91101',
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2400,
      type: 'HOUSE',
      status: 'AVAILABLE',
      images: [],
      features: ['Large Backyard', 'Updated Kitchen', 'Hardwood Floors', 'Near Schools', 'Two-Car Garage'],
      agentId: agent1.id,
    },
  })
  console.log('✅ Created property:', property3.title)

  const property4 = await prisma.property.create({
    data: {
      title: 'Modern Loft in Arts District',
      description: 'Industrial-chic loft with exposed brick, soaring ceilings, and modern finishes. Located in vibrant Arts District with galleries, restaurants, and nightlife at your doorstep.',
      price: 675000,
      address: '321 Industrial Way, Loft 4B',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90013',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1600,
      type: 'APARTMENT',
      status: 'AVAILABLE',
      images: [],
      features: ['Exposed Brick', 'High Ceilings', 'Open Floor Plan', 'Walk-in Closet', 'In-Unit Laundry'],
      agentId: agent2.id,
    },
  })
  console.log('✅ Created property:', property4.title)

  const property5 = await prisma.property.create({
    data: {
      title: 'Prime Commercial Building Downtown',
      description: 'Excellent investment opportunity! Multi-tenant commercial building in prime downtown location. Fully leased with stable long-term tenants. Great cash flow and appreciation potential.',
      price: 3200000,
      address: '555 Business Plaza',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90014',
      bedrooms: 0,
      bathrooms: 8,
      sqft: 12000,
      type: 'COMMERCIAL',
      status: 'AVAILABLE',
      images: [],
      features: ['Fully Leased', 'Elevator', 'Parking Structure', 'Central Location', 'High Visibility'],
      agentId: agent1.id,
    },
  })
  console.log('✅ Created property:', property5.title)

  const property6 = await prisma.property.create({
    data: {
      title: 'Cozy Beachfront Condo',
      description: 'Wake up to ocean breezes in this charming 2-bedroom beachfront condo. Direct beach access, updated interior, and resort-style amenities including pool and fitness center.',
      price: 925000,
      address: '888 Pacific Coast Highway, Unit 202',
      city: 'Santa Monica',
      state: 'CA',
      zipCode: '90401',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      type: 'CONDO',
      status: 'SOLD',
      images: [],
      features: ['Beach Access', 'Pool', 'Fitness Center', 'Balcony', 'Underground Parking'],
      agentId: agent2.id,
    },
  })
  console.log('✅ Created property:', property6.title)

  // Create ratings
  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Absolutely stunning property! The ocean views are incredible and the agent was very professional throughout the entire process.',
      propertyId: property1.id,
      customerId: customer1.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Perfect penthouse with amazing city views. The building amenities are top-notch. Highly recommend!',
      propertyId: property2.id,
      customerId: customer2.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Great family home in an excellent neighborhood. The backyard is perfect for kids. Only minor updates needed.',
      propertyId: property3.id,
      customerId: customer1.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Love the industrial aesthetic! The Arts District location is unbeatable. So many great restaurants nearby.',
      propertyId: property4.id,
      customerId: customer2.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Beautiful beachfront location with excellent amenities. Would have given 5 stars but parking is a bit tight.',
      propertyId: property6.id,
      customerId: customer1.id,
    },
  })

  console.log('✅ Created ratings')

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📝 Demo Accounts:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Admin: admin@realstate.com / admin123')
  console.log('Agent 1: john.smith@realstate.com / agent123')
  console.log('Agent 2: sarah.johnson@realstate.com / agent123')
  console.log('Customer 1: mike.wilson@example.com / customer123')
  console.log('Customer 2: emily.brown@example.com / customer123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
