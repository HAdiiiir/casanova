"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getDeveloperById, getProjectsByDeveloper, getProgressByProject, formatPrice } from "@/lib/data";
import { ArrowLeft, Building2, Calendar, Globe, MapPin, ArrowRight } from "lucide-react";

const developerBanners: Record<string, string> = {
  'dev-1': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  'dev-2': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop',
  'dev-3': 'https://images.unsplash.com/photo-1464938050520-ef2571f65923?q=80&w=1600&auto=format&fit=crop',
};

const projectImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop',
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
  'ready': 'Ready',
  'sold-out': 'Sold Out',
};

export default function DeveloperDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const developer = getDeveloperById(resolvedParams.id);

  if (!developer) {
    notFound();
  }

  const projects = getProjectsByDeveloper(developer.id);
  
  // Get all progress updates for developer's projects
  const allProgress = projects.flatMap(project => 
    getProgressByProject(project.id).map(prog => ({
      ...prog,
      projectName: project.name
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[350px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={developerBanners[developer.id] || developerBanners['dev-1']}
            alt={developer.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
        </div>
        
        <div className="container relative mx-auto px-4 pb-8 lg:px-8">
          <Link href="/developers">
            <Button variant="ghost" className="mb-4 gap-2 text-background hover:bg-background/10 hover:text-background">
              <ArrowLeft className="h-4 w-4" />
              Back to Developers
            </Button>
          </Link>
          
          <div className="flex items-end gap-6">
            <div className="h-24 w-24 rounded-xl bg-background shadow-lg flex items-center justify-center shrink-0">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-background mb-2">
                {developer.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-background/80 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Est. {developer.establishedYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{developer.headquarters}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  <span>{developer.projectsCount} Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {developer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{developer.description}</p>
                </CardContent>
              </Card>

              {/* Projects */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold">Projects by {developer.name}</h2>
                  <Link href={`/projects?developer=${developer.id}`}>
                    <Button variant="outline" className="gap-2">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground">No projects available yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
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
                              <p className="text-background text-sm">Starting from</p>
                              <p className="text-background text-xl font-bold">
                                {formatPrice(project.priceFrom)}
                              </p>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{project.location}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Development Progress */}
              {allProgress.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6">Development Progress</h2>
                  <div className="space-y-4">
                    {allProgress.map((update) => (
                      <Card key={update.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="secondary" className="mb-2">{update.projectName}</Badge>
                              <h3 className="font-semibold">{update.title}</h3>
                              <p className="text-sm text-muted-foreground">{update.milestone}</p>
                            </div>
                            <span className="text-2xl font-bold text-primary">{update.progress}%</span>
                          </div>
                          <Progress value={update.progress} className="my-4" />
                          <p className="text-sm text-muted-foreground">{update.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Updated: {new Date(update.updatedAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Established</span>
                    <span className="font-medium">{developer.establishedYear}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Headquarters</span>
                    <span className="font-medium">{developer.headquarters}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Total Projects</span>
                    <span className="font-medium">{developer.projectsCount}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Website</span>
                    <a 
                      href={developer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      Visit <Globe className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Interested in {developer.name}?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Contact us to learn more about their projects and available units.
                  </p>
                  <Link href="/contact">
                    <Button variant="secondary" className="w-full">
                      Get in Touch
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
