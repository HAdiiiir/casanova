"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  getProjectById, getDeveloperById, getZoneById, 
  getUnitsByProject, getProgressByProject, formatPrice 
} from "@/lib/data";
import { 
  ArrowLeft, MapPin, Calendar, Building2, Check, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Share2, Heart, Bed, Bath, Maximize
} from "lucide-react";

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

const projectImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
];

const unitImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
];

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = getProjectById(resolvedParams.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    notFound();
  }

  const developer = getDeveloperById(project.developerId);
  const zone = getZoneById(project.zoneId);
  const units = getUnitsByProject(project.id);
  const progress = getProgressByProject(project.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4 lg:px-8">
        <Link href="/projects">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 lg:px-8 mb-8">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={projectImages[currentImageIndex]}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              {currentImageIndex + 1} / {projectImages.length}
            </div>

            <Badge className={`absolute top-4 left-4 ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </Badge>

            <div className="absolute top-4 right-4 flex gap-2">
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
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
              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{zone?.name || project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{project.availableUnits} of {project.totalUnits} units available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Completion: {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent overflow-x-auto">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="units"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Units ({units.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="amenities"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Amenities
                </TabsTrigger>
                <TabsTrigger 
                  value="progress"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>

                {developer && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Developer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/developers/${developer.id}`} className="flex items-center gap-4 group">
                        <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{developer.name}</h3>
                          <p className="text-sm text-muted-foreground">{developer.projectsCount} Projects | Est. {developer.establishedYear}</p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                        alt="Location Map"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 text-muted-foreground">{project.location}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="units" className="pt-6">
                {units.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground">No units available for this project yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {units.map((unit, index) => (
                      <Link key={unit.id} href={`/units/${unit.id}`}>
                        <Card className="group overflow-hidden hover:shadow-lg transition-all">
                          <div className="flex">
                            <div className="relative w-32 aspect-square shrink-0">
                              <Image
                                src={unitImages[index % unitImages.length]}
                                alt={unit.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="flex-1 p-4">
                              <h3 className="font-medium group-hover:text-primary transition-colors mb-1">
                                {unit.name}
                              </h3>
                              <p className="text-primary font-bold mb-2">{formatPrice(unit.price)}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                {unit.bedrooms > 0 && (
                                  <span className="flex items-center gap-1">
                                    <Bed className="h-3 w-3" /> {unit.bedrooms}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Bath className="h-3 w-3" /> {unit.bathrooms}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Maximize className="h-3 w-3" /> {unit.area} m²
                                </span>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="amenities" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="pt-6 space-y-4">
                {progress.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground">No progress updates available yet.</p>
                  </div>
                ) : (
                  progress.map((update) => (
                    <Card key={update.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{update.title}</h3>
                            <p className="text-sm text-muted-foreground">{update.milestone}</p>
                          </div>
                          <Badge variant="secondary">{update.progress}%</Badge>
                        </div>
                        <Progress value={update.progress} className="mb-4" />
                        <p className="text-muted-foreground mb-4">{update.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {new Date(update.updatedAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(project.priceFrom)} - {formatPrice(project.priceTo)}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Total Units</span>
                    <span className="font-medium">{project.totalUnits}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-medium text-green-600">{project.availableUnits}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={statusColors[project.status]}>
                      {statusLabels[project.status]}
                    </Badge>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium">
                      {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <Button className="w-full mb-3 gap-2" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  Inquire Now
                </Button>

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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
