'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Building2, Star, Bed, Bath, Square, MapPin, User } from 'lucide-react'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    checkAuth()
    loadProperty()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setUser(data.user)
    } catch (error) {
      // User not logged in
    }
  }

  const loadProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${params.id}`)
      const data = await res.json()
      setProperty(data.property)
    } catch (error) {
      console.error('Failed to load property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      router.push('/login')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/properties/${params.id}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      })

      if (res.ok) {
        setComment('')
        loadProperty()
        alert('Rating submitted successfully!')
      }
    } catch (error) {
      console.error('Failed to submit rating:', error)
      alert('Failed to submit rating')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading property...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">RealState SaaS</h1>
            </Link>
            
            <nav className="flex gap-4">
              <Link href="/properties">
                <Button variant="ghost">All Properties</Button>
              </Link>
              {user ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-2xl border border-border/30"></div>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{property.title}</CardTitle>
                    <CardDescription className="text-lg">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {property.address}, {property.city}, {property.state} {property.zipCode}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      ${property.price.toLocaleString()}
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                      {property.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{property.sqft} sqft</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>

                {property.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ratings Section */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Ratings</CardTitle>
                <CardDescription>
                  {property.averageRating > 0 && (
                    <div className="flex items-center gap-2 text-lg">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{property.averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({property.ratings.length} reviews)
                      </span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Submit Rating */}
                  {user && (
                    <form onSubmit={handleSubmitRating} className="border border-border/50 rounded-xl p-4 bg-secondary/30 backdrop-blur-sm">
                      <h4 className="font-semibold mb-3">Rate this property</h4>
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                value <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Write your review (optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-3"
                      />
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </form>
                  )}

                  {/* Ratings List */}
                  <div className="space-y-4">
                    {property.ratings.map((r: any) => (
                      <div key={r.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{r.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < r.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {r.comment && (
                          <p className="text-sm text-muted-foreground">{r.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {property.ratings.length === 0 && !user && (
                    <p className="text-center text-muted-foreground py-8">
                      No ratings yet. Be the first to rate this property!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg">{property.agent.name}</p>
                    <p className="text-sm text-muted-foreground">{property.agent.email}</p>
                    {property.agent.phone && (
                      <p className="text-sm text-muted-foreground">{property.agent.phone}</p>
                    )}
                  </div>
                  <Button className="w-full">Contact Agent</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Type</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full font-medium">
                  {property.type}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
