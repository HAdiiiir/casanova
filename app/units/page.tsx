"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { units, projects, formatPrice, formatArea, getProjectById } from "@/lib/data";
import { Search, SlidersHorizontal, Bed, Bath, Maximize, Heart, Grid, List, X } from "lucide-react";

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
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=800&auto=format&fit=crop',
];

export default function UnitsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 25000000]);
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const filteredUnits = useMemo(() => {
    let result = units.filter((unit) => {
      const matchesSearch = unit.name.toLowerCase().includes(search.toLowerCase()) ||
        unit.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || unit.type === typeFilter;
      const matchesStatus = statusFilter === "all" || unit.status === statusFilter;
      const matchesProject = projectFilter === "all" || unit.projectId === projectFilter;
      const matchesPrice = unit.price >= priceRange[0] && unit.price <= priceRange[1];
      const matchesBedrooms = bedroomFilter === "all" || 
        (bedroomFilter === "0" && unit.bedrooms === 0) ||
        (bedroomFilter === "1" && unit.bedrooms === 1) ||
        (bedroomFilter === "2" && unit.bedrooms === 2) ||
        (bedroomFilter === "3" && unit.bedrooms === 3) ||
        (bedroomFilter === "4+" && unit.bedrooms >= 4);

      return matchesSearch && matchesType && matchesStatus && matchesProject && matchesPrice && matchesBedrooms;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area-low":
        result.sort((a, b) => a.area - b.area);
        break;
      case "area-high":
        result.sort((a, b) => b.area - a.area);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, typeFilter, statusFilter, projectFilter, priceRange, bedroomFilter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setProjectFilter("all");
    setPriceRange([0, 25000000]);
    setBedroomFilter("all");
  };

  const hasActiveFilters = search || typeFilter !== "all" || statusFilter !== "all" || 
    projectFilter !== "all" || priceRange[0] > 0 || priceRange[1] < 25000000 || bedroomFilter !== "all";

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <label className="text-sm font-medium mb-2 block">Property Type</label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(typeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium mb-2 block">Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project */}
      <div>
        <label className="text-sm font-medium mb-2 block">Project</label>
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-sm font-medium mb-2 block">Bedrooms</label>
        <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="0">Studio</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4+">4+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-4 block">
          Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={25000000}
          step={500000}
          className="mt-2"
        />
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-2">
            Browse Our <span className="text-primary">Properties</span>
          </h1>
          <p className="text-muted-foreground">
            Discover {units.length} premium properties across Egypt&apos;s most prestigious locations
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="font-semibold mb-4">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-1">Active</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area-low">Area: Small to Large</SelectItem>
                    <SelectItem value="area-high">Area: Large to Small</SelectItem>
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

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredUnits.length} of {units.length} properties
            </p>

            {/* Units Grid/List */}
            {filteredUnits.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No properties match your criteria</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" 
                : "space-y-4"
              }>
                {filteredUnits.map((unit, index) => {
                  const project = getProjectById(unit.projectId);
                  
                  if (viewMode === "list") {
                    return (
                      <Link key={unit.id} href={`/units/${unit.id}`}>
                        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-72 aspect-[4/3] sm:aspect-auto shrink-0">
                              <Image
                                src={unitImages[index % unitImages.length]}
                                alt={unit.name}
                                fill
                                className="object-cover"
                              />
                              <Badge className={`absolute top-3 left-3 ${statusColors[unit.status]}`}>
                                {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                              </Badge>
                            </div>
                            <CardContent className="flex-1 p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Badge variant="secondary" className="mb-2">
                                    {typeLabels[unit.type]}
                                  </Badge>
                                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {unit.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm">{project?.name}</p>
                                </div>
                                <p className="text-xl font-bold text-primary">{formatPrice(unit.price)}</p>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{unit.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {unit.bedrooms > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <Bed className="h-4 w-4" />
                                    <span>{unit.bedrooms} Beds</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                  <Bath className="h-4 w-4" />
                                  <span>{unit.bathrooms} Baths</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Maximize className="h-4 w-4" />
                                  <span>{formatArea(unit.area, unit.areaUnit)}</span>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    );
                  }

                  return (
                    <Link key={unit.id} href={`/units/${unit.id}`}>
                      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={unitImages[index % unitImages.length]}
                            alt={unit.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                          
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                              {typeLabels[unit.type]}
                            </Badge>
                            <Badge className={statusColors[unit.status]}>
                              {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                            </Badge>
                          </div>

                          <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>

                          <div className="absolute bottom-3 left-3">
                            <p className="text-background text-2xl font-bold">
                              {formatPrice(unit.price)}
                            </p>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {unit.name}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                            {project?.name || 'Premium Location'}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {unit.bedrooms > 0 && (
                              <div className="flex items-center gap-1.5">
                                <Bed className="h-4 w-4" />
                                <span>{unit.bedrooms}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <Bath className="h-4 w-4" />
                              <span>{unit.bathrooms}</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
