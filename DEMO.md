# Deployment Guide for Vercel

## Live Demo
🌐 **[https://real-state-bmtj.vercel.app](https://real-state-bmtj.vercel.app)**

## Demo Credentials

### Admin Access
- **Email:** admin@realstate.com
- **Password:** admin123
- **Features:** Full dashboard, analytics, user management

### Agent Access
- **Email:** john.smith@realstate.com or sarah.johnson@realstate.com
- **Password:** agent123
- **Features:** Create properties, manage listings, view dashboard

### Customer Access
- **Email:** mike.wilson@example.com or emily.brown@example.com
- **Password:** customer123
- **Features:** Browse properties, submit ratings and reviews

## Quick Start for Visitors

1. Visit [https://real-state-bmtj.vercel.app](https://real-state-bmtj.vercel.app)
2. Click "Get Started" or "Login"
3. Use any of the demo accounts above
4. Explore the features:
   - Browse property listings
   - View property details
   - Submit ratings (as customer)
   - Check the analytics dashboard (as admin/agent)
   - Create new properties (as agent/admin)

## Features to Try

### As a Customer 👤
- Browse all available properties
- View detailed property information
- Submit ratings and reviews (1-5 stars)
- Search properties by location or title

### As an Agent 🏢
- Access analytics dashboard
- Create new property listings
- Manage your properties
- View customer ratings and feedback

### As an Admin 👨‍💼
- Full dashboard with statistics
- View all properties and users
- Monitor platform activity
- Access to all agent features

## Sample Properties Available

1. **Luxury Modern Villa** - $2.5M (Malibu)
2. **Downtown Penthouse** - $1.8M (Los Angeles)
3. **Family Home** - $850K (Pasadena)
4. **Modern Loft** - $675K (Arts District)
5. **Commercial Building** - $3.2M (Downtown LA)
6. **Beachfront Condo** - $925K [SOLD] (Santa Monica)

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma
- **Authentication:** JWT with httpOnly cookies
- **Deployment:** Vercel
- **UI Components:** Radix UI

## Environment Setup (For Developers)

If you want to deploy your own instance:

1. **Database Setup:**
   - Create a PostgreSQL database (Vercel Postgres recommended)
   - Set `DATABASE_URL` in environment variables

2. **Environment Variables:**
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-secure-random-secret"
   NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Seed Database:**
   ```bash
   npx prisma db seed
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create property (Agent/Admin)
- `GET /api/properties/[id]` - Get property details
- `POST /api/properties/[id]/ratings` - Submit rating
- `GET /api/properties/[id]/ratings` - Get property ratings

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin/Agent)

## Support

For issues or questions:
- GitHub: [github.com/MHDKHALID/real-state](https://github.com/MHDKHALID/real-state)
- Open an issue on GitHub

## License

MIT License - feel free to use this project for learning or as a foundation for your own real estate platform!

---

**Built with ❤️ using Next.js and Vercel**
