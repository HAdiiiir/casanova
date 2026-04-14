"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zones } from "@/lib/data";
import { ArrowRight, Building2, FolderKanban } from "lucide-react";

const zoneImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop',
];

export function ZonesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Prime Locations</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Explore Egypt&apos;s Most
              <span className="block text-primary">Prestigious Areas</span>
            </h2>
          </div>
          <Link href="/zones">
            <Button variant="outline" className="gap-2">
              View All Zones
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Zones Grid - Bento Style */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {zones.map((zone, index) => (
            <Link 
              key={zone.id} 
              href={`/zones/${zone.id}`}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-square md:aspect-auto h-full min-h-[300px]' : 'aspect-[4/3]'}`}>
                <Image
                  src={zoneImages[index]}
                  alt={zone.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className={`font-serif font-bold text-background mb-2 ${
                    index === 0 ? 'text-3xl lg:text-4xl' : 'text-xl'
                  }`}>
                    {zone.name}
                  </h3>
                  
                  {index === 0 && (
                    <p className="text-background/80 mb-4 max-w-md line-clamp-2">
                      {zone.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-background/90 text-sm">
                      <FolderKanban className="h-4 w-4" />
                      <span>{zone.projectCount} Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-background/90 text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{zone.unitCount} Units</span>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
