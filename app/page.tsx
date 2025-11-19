import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2, Star, BarChart3, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground py-2 text-center text-sm">
        <p className="font-medium">
          🎉 Live Demo • Try it now with: <strong>admin@realstate.com</strong> / <strong>admin123</strong>
        </p>
      </div>
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-xl bg-background/60 sticky top-0 z-50">
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
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <h2 className="text-6xl font-bold mb-6 relative z-10">
          Modern Property Management
          <br />
          <span className="text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Made Simple</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
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
        <h3 className="text-4xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-foreground">Analytics Dashboard</h4>
            <p className="text-muted-foreground">
              Comprehensive dashboard with real-time analytics, property stats,
              and performance metrics.
            </p>
          </div>

          <div className="p-6 border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Star className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-foreground">Customer Ratings</h4>
            <p className="text-muted-foreground">
              Built-in rating system for properties with reviews and feedback
              from customers.
            </p>
          </div>

          <div className="p-6 border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-foreground">User Management</h4>
            <p className="text-muted-foreground">
              Role-based access control for admins, agents, and customers with
              secure authentication.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-4 text-primary-foreground">
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
      <footer className="border-t border-border/40 py-8 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 RealState SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
