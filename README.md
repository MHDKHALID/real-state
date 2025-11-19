# Real Estate SaaS Platform

A complete full-stack SaaS application for real estate companies with dashboard analytics, property management, and customer rating system.

## 🌐 Live Demo

**[https://real-state-bmtj.vercel.app](https://real-state-bmtj.vercel.app)**

### Demo Accounts

Try the application with these pre-configured accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Admin** | admin@realstate.com | admin123 | Full access to all features |
| **Agent** | john.smith@realstate.com | agent123 | Create/manage properties |
| **Agent** | sarah.johnson@realstate.com | agent123 | Create/manage properties |
| **Customer** | mike.wilson@example.com | customer123 | Browse and rate properties |
| **Customer** | emily.brown@example.com | customer123 | Browse and rate properties |

> **Note:** This is a demo environment. Feel free to explore all features!

## 🚀 Features

- **User Authentication** - Secure login/registration with role-based access (Admin, Agent, Customer)
- **Property Management** - Full CRUD operations for property listings
- **Customer Rating System** - 5-star rating system with reviews for properties
- **Analytics Dashboard** - Real-time stats including total properties, customers, revenue
- **Responsive Design** - Modern UI built with Tailwind CSS
- **RESTful API** - Complete backend API with Next.js App Router

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with httpOnly cookies
- **UI Components**: Radix UI, Lucide Icons

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/MHDKHALID/real-state.git
cd real-state
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/realstate?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **Seed the database with demo data** (optional)
```bash
npx prisma db seed
```

This will create:
- 5 demo users (1 admin, 2 agents, 2 customers)
- 6 sample properties
- Multiple ratings and reviews

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
real-state/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── properties/     # Property CRUD endpoints
│   │   └── dashboard/      # Dashboard stats endpoint
│   ├── dashboard/          # Dashboard page
│   ├── properties/         # Properties pages
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   └── ui/                # UI component library
├── lib/                    # Utility functions
│   ├── auth.ts            # Authentication utilities
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
├── prisma/                 # Database schema and migrations
│   └── schema.prisma      # Prisma schema
└── package.json           # Dependencies
```

## 🔐 User Roles

1. **ADMIN** - Full access to all features
2. **AGENT** - Can create and manage properties, view dashboard
3. **CUSTOMER** - Can view properties and submit ratings

## 📊 Database Schema

- **User** - User accounts with role-based access
- **Property** - Property listings with full details
- **Rating** - Customer ratings and reviews for properties
- **Appointment** - Appointment scheduling system

## 🎨 Key Features Detail

### Dashboard
- Property statistics overview
- Revenue tracking
- Recent properties and ratings
- User management

### Property Management
- Create, read, update property listings
- Image gallery support
- Status tracking (Available, Sold, Rented, Pending)
- Property types (House, Apartment, Condo, Land, Commercial)

### Rating System
- 5-star rating system
- Text reviews
- Average rating calculation
- User-based rating restrictions (one rating per user per property)

## 🚀 Deployment

### Build for production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create property (Agent/Admin only)
- `GET /api/properties/[id]` - Get property details
- `POST /api/properties/[id]/ratings` - Submit rating
- `GET /api/properties/[id]/ratings` - Get property ratings

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**MHDKHALID**
- GitHub: [@MHDKHALID](https://github.com/MHDKHALID)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Radix UI for accessible components
- Prisma for the excellent ORM
