"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUnitById, getProjectById, formatPrice, formatArea, getUnitsByProject } from "@/lib/data";
import { 
  ArrowLeft, Bed, Bath, Maximize, Car, Layers, Heart, Share2, 
  MapPin, Calendar, Phone, Mail, MessageCircle, Check, ChevronLeft, ChevronRight,
  Building2, Ruler, Home
} from "lucide-react";

const typeLabels: Record<string, string> = {
  'villa': 'Villa',
  'apartment': 'Apartment',
  'townhouse': 'Townhouse',
  'duplex': 'Duplex',
  'penthouse': 'Penthouse',
  'studio': 'Studio',
};

const statusColors = {
  'available': 'bg-green-500/10 text-green-600 border-green-500/20',
  'reserved': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'sold': 'bg-red-500/10 text-red-600 border-red-500/20',
};

const unitImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200&auto=format&fit=crop',
];

export default function UnitDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const unit = getUnitById(resolvedParams.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (!unit) {
    notFound();
  }

  const project = getProjectById(unit.projectId);
  const similarUnits = getUnitsByProject(unit.projectId).filter(u => u.id !== unit.id).slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % unitImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + unitImages.length) % unitImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <Link href="/units">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Units
          </Button>
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 lg:px-8 mb-8">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={unitImages[currentImageIndex]}
              alt={unit.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              {currentImageIndex + 1} / {unitImages.length}
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {typeLabels[unit.type]}
              </Badge>
              <Badge className={statusColors[unit.status]}>
                {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 right-4 hidden md:flex gap-2">
            {unitImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{unit.name}</h1>
              {project && (
                <Link href={`/projects/${project.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="h-4 w-4" />
                  {project.name}, {project.location}
                </Link>
              )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unit.bedrooms > 0 && (
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{unit.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bath className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unit.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Maximize className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unit.area}</p>
                    <p className="text-xs text-muted-foreground">{unit.areaUnit === 'sqm' ? 'Sq. Meters' : 'Sq. Feet'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unit.parkingSpaces}</p>
                    <p className="text-xs text-muted-foreground">Parking</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="location"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Location
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{unit.description}</p>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Home className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{typeLabels[unit.type]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Layers className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Floors</p>
                          <p className="font-medium">{unit.floors}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Ruler className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Area</p>
                          <p className="font-medium">{formatArea(unit.area, unit.areaUnit)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Listed</p>
                          <p className="font-medium">{new Date(unit.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {unit.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.location}</p>
                          </div>
                        </div>
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                          <Image
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                            alt="Location Map"
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Similar Units */}
            {similarUnits.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Similar Properties</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {similarUnits.map((similarUnit, index) => (
                    <Link key={similarUnit.id} href={`/units/${similarUnit.id}`}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={unitImages[(index + 2) % unitImages.length]}
                            alt={similarUnit.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium group-hover:text-primary transition-colors">{similarUnit.name}</h3>
                          <p className="text-primary font-bold">{formatPrice(similarUnit.price)}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(unit.price)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(Math.round(unit.price / unit.area))}/{unit.areaUnit === 'sqm' ? 'm²' : 'ft²'}
                  </p>
                </div>

                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mb-3 gap-2" size="lg">
                      <MessageCircle className="h-5 w-5" />
                      Inquire Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Us About This Property</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">First Name</label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Phone</label>
                        <Input type="tel" placeholder="+20 100 000 0000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Message</label>
                        <Textarea 
                          placeholder="I'm interested in this property..." 
                          rows={4}
                          defaultValue={`I'm interested in ${unit.name} at ${project?.name || 'this location'}.`}
                        />
                      </div>
                      <Button type="submit" className="w-full">Send Inquiry</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="flex gap-2">
                  <a href="tel:+201001234567" className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </a>
                  <a href="https://wa.me/201001234567" className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium mb-3">Contact Agent</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">AH</span>
                    </div>
                    <div>
                      <p className="font-medium">Ahmed Hassan</p>
                      <p className="text-sm text-muted-foreground">Senior Sales Agent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
