"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects, formatPrice, getDeveloperById, getZoneById } from "@/lib/data";
import { ArrowRight, MapPin, Building2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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

export function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.slice(0, 4);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Featured Projects</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Explore Our Premium
              <span className="block text-primary">Developments</span>
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => {
            const developer = getDeveloperById(project.developerId);
            const zone = getZoneById(project.zoneId);
            
            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop&${index}`}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <Badge className={`absolute top-3 left-3 ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </Badge>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-background text-sm font-medium">Starting from</p>
                      <p className="text-background text-xl font-bold">
                        {formatPrice(project.priceFrom)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{zone?.name || project.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{project.availableUnits} units</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(project.completionDate).getFullYear()}</span>
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
