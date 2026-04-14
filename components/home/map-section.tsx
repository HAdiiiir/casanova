"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, formatPrice } from "@/lib/data";
import { MapPin, Building2, ArrowRight, X } from "lucide-react";

export function MapSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Simplified marker positions for demonstration
  const markerPositions: Record<string, { top: string; left: string }> = {
    'proj-1': { top: '40%', left: '65%' },
    'proj-2': { top: '25%', left: '30%' },
    'proj-3': { top: '45%', left: '75%' },
    'proj-4': { top: '50%', left: '45%' },
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Location Map</p>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Discover Projects
            <span className="block text-primary">Across Egypt</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our developments on the map. Click on any marker to see project details.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
          {/* Map Background - Using a stylized representation */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')`,
                filter: 'saturate(0.3) brightness(1.1)',
              }}
            />
            <div className="absolute inset-0 bg-primary/5" />

            {/* Map Markers */}
            {projects.map((project) => {
              const position = markerPositions[project.id];
              if (!position) return null;

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                    selectedProject?.id === project.id ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{ top: position.top, left: position.left }}
                >
                  <div className={`relative flex items-center justify-center ${
                    selectedProject?.id === project.id ? 'animate-pulse' : ''
                  }`}>
                    <div className={`absolute h-12 w-12 rounded-full ${
                      selectedProject?.id === project.id ? 'bg-primary/30' : 'bg-primary/20'
                    } animate-ping`} />
                    <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Project Info Card */}
            {selectedProject && (
              <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 shadow-xl animate-slide-up z-20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedProject.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedProject.location}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary">
                      {selectedProject.availableUnits} units available
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {selectedProject.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="font-bold text-primary">{formatPrice(selectedProject.priceFrom)}</p>
                    </div>
                    <Link href={`/projects/${selectedProject.id}`}>
                      <Button size="sm" className="gap-1">
                        View Project
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Project Locations</p>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs">{projects.length} Projects</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {projects.map((project) => (
            <Button
              key={project.id}
              variant={selectedProject?.id === project.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedProject(project)}
              className="gap-2"
            >
              <Building2 className="h-3 w-3" />
              {project.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
