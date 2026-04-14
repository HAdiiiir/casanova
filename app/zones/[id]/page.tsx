"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getZoneById, getProjectsByZone, formatPrice } from "@/lib/data";
import { ArrowLeft, Building2, FolderKanban, MapPin, Calendar, ArrowRight } from "lucide-react";

const zoneImages: Record<string, string> = {
  'zone-1': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
  'zone-2': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  'zone-3': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop',
  'zone-4': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop',
};

const projectImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
];

const statusColors = {
  'upcoming': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'under-construction': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'ready': 'bg-green-500/10 text-green-600 border-green-500/20',
  'sold-out': 'bg-red-500/10 text-red-600 border-red-500/20',
};

const statusLabels = {
  'upcoming': 'Coming Soon',
  'under-construction': 'Under Construction',
  'ready': 'Ready to Move',
  'sold-out': 'Sold Out',
};

export default function ZoneDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const zone = getZoneById(resolvedParams.id);

  if (!zone) {
    notFound();
  }

  const projects = getProjectsByZone(zone.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={zoneImages[zone.id] || zoneImages['zone-1']}
            alt={zone.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
        </div>
        
        <div className="container relative mx-auto px-4 pb-12 lg:px-8">
          <Link href="/zones">
            <Button variant="ghost" className="mb-4 gap-2 text-background hover:bg-background/10 hover:text-background">
              <ArrowLeft className="h-4 w-4" />
              Back to Zones
            </Button>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-background mb-2">
            {zone.name}
          </h1>
          <div className="flex items-center gap-2 text-background/80 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{zone.location}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-background text-sm bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <FolderKanban className="h-4 w-4" />
              <span>{zone.projectCount} Projects</span>
            </div>
            <div className="flex items-center gap-1.5 text-background text-sm bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Building2 className="h-4 w-4" />
              <span>{zone.unitCount} Units</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-serif font-bold mb-4">About {zone.name}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {zone.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects in Zone */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Available Projects</p>
              <h2 className="text-3xl font-serif font-bold">
                Projects in {zone.name}
              </h2>
            </div>
            <Link href={`/projects?zone=${zone.id}`}>
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl">
              <p className="text-muted-foreground">No projects available in this zone yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={projectImages[index % projectImages.length]}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                      
                      <Badge className={`absolute top-3 left-3 ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </Badge>

                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-background text-sm font-medium">Starting from</p>
                        <p className="text-background text-xl font-bold">
                          {formatPrice(project.priceFrom)}
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>{project.availableUnits} units</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(project.completionDate).getFullYear()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
