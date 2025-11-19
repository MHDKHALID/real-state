import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2, Star, BarChart3, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">RealState SaaS</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Modern Property Management
          <br />
          <span className="text-primary">Made Simple</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Complete SaaS platform for real estate companies with powerful dashboard,
          customer ratings, and property management tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <Link href="/properties">
            <Button size="lg" variant="outline">
              Browse Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Analytics Dashboard</h4>
            <p className="text-muted-foreground">
              Comprehensive dashboard with real-time analytics, property stats,
              and performance metrics.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Customer Ratings</h4>
            <p className="text-muted-foreground">
              Built-in rating system for properties with reviews and feedback
              from customers.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">User Management</h4>
            <p className="text-muted-foreground">
              Role-based access control for admins, agents, and customers with
              secure authentication.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Real Estate Business?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of real estate companies using our platform
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 RealState SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
