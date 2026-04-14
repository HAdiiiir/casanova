"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { units, formatPrice, formatArea, getProjectById } from "@/lib/data";
import { ArrowRight, Bed, Bath, Maximize, Heart } from "lucide-react";

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
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
];

export function FeaturedUnits() {
  const featuredUnits = units.filter(u => u.status === 'available').slice(0, 6);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Available Properties</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Find Your Perfect
              <span className="block text-primary">Living Space</span>
            </h2>
          </div>
          <Link href="/units">
            <Button variant="outline" className="gap-2">
              Browse All Units
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Units Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredUnits.map((unit, index) => {
            const project = getProjectById(unit.projectId);
            
            return (
              <Link key={unit.id} href={`/units/${unit.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={unitImages[index % unitImages.length]}
                      alt={unit.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {typeLabels[unit.type]}
                      </Badge>
                      <Badge className={statusColors[unit.status]}>
                        {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-background text-2xl font-bold">
                        {formatPrice(unit.price)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {unit.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                      {project?.name || 'Premium Location'}
                    </p>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {unit.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="h-4 w-4" />
                          <span>{unit.bedrooms} {unit.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4" />
                        <span>{unit.bathrooms} {unit.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4" />
                        <span>{formatArea(unit.area, unit.areaUnit)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
