"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects, zones, developers, formatPrice, getZoneById, getDeveloperById } from "@/lib/data";
import { Search, Building2, MapPin, Calendar, ArrowRight, Grid, List } from "lucide-react";

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
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [developerFilter, setDeveloperFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesZone = zoneFilter === "all" || project.zoneId === zoneFilter;
      const matchesDeveloper = developerFilter === "all" || project.developerId === developerFilter;

      return matchesSearch && matchesStatus && matchesZone && matchesDeveloper;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-high":
        result.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "completion":
        result.sort((a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime());
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, statusFilter, zoneFilter, developerFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">
            Our <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground">
            Explore {projects.length} premium developments across Egypt
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b sticky top-16 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={zoneFilter} onValueChange={setZoneFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={developerFilter} onValueChange={setDeveloperFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Developer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Developers</SelectItem>
                  {developers.map((dev) => (
                    <SelectItem key={dev.id} value={dev.id}>{dev.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="completion">Completion Date</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden sm:flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects match your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setZoneFilter("all");
                setDeveloperFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
            }>
              {filteredProjects.map((project, index) => {
                const zone = getZoneById(project.zoneId);
                const developer = getDeveloperById(project.developerId);

                if (viewMode === "list") {
                  return (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-80 aspect-video md:aspect-auto shrink-0">
                            <Image
                              src={projectImages[index % projectImages.length]}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
                            <Badge className={`absolute top-3 left-3 ${statusColors[project.status]}`}>
                              {statusLabels[project.status]}
                            </Badge>
                          </div>
                          <CardContent className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                                  {project.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{developer?.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Starting from</p>
                                <p className="text-xl font-bold text-primary">{formatPrice(project.priceFrom)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                              <MapPin className="h-4 w-4" />
                              <span>{zone?.name || project.location}</span>
                            </div>
                            
                            <p className="text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{project.availableUnits} units available</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Completion: {new Date(project.completionDate).getFullYear()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  );
                }

                return (
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
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {project.name}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3">{developer?.name}</p>
                        
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
          )}
        </div>
      </section>
    </div>
  );
}
