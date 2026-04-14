"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowRight, Play, Building2, MapPin, Home } from "lucide-react";

export function HeroSection() {
  const [searchType, setSearchType] = useState("all");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Over 25 Years of Excellence
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-background md:text-5xl lg:text-6xl animate-slide-up">
            Discover Your
            <span className="block text-primary">Dream Home</span>
            in Egypt
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-xl text-lg text-background/80 animate-slide-up animation-delay-100">
            Explore premium villas, modern apartments, and exclusive compounds across Egypt&apos;s most prestigious locations. Your perfect home awaits.
          </p>

          {/* Search Box */}
          <div className="mb-8 rounded-2xl bg-background/95 p-4 shadow-2xl backdrop-blur-sm animate-slide-up animation-delay-200">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search by city or area..." 
                    className="pl-10 border-0 bg-muted/50 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="w-full md:w-40">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Property Type</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="border-0 bg-muted/50">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Price Range</label>
                <Select>
                  <SelectTrigger className="border-0 bg-muted/50">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="1-3">1M - 3M EGP</SelectItem>
                    <SelectItem value="3-5">3M - 5M EGP</SelectItem>
                    <SelectItem value="5-10">5M - 10M EGP</SelectItem>
                    <SelectItem value="10+">10M+ EGP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button size="lg" className="w-full gap-2 md:w-auto">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 animate-slide-up animation-delay-300">
            <Link href="/units">
              <Button variant="outline" className="gap-2 border-background/30 bg-background/10 text-background hover:bg-background/20 hover:text-background backdrop-blur-sm">
                <Building2 className="h-4 w-4" />
                Browse Units
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="gap-2 border-background/30 bg-background/10 text-background hover:bg-background/20 hover:text-background backdrop-blur-sm">
                <Home className="h-4 w-4" />
                View Projects
              </Button>
            </Link>
            <Button variant="ghost" className="gap-2 text-background hover:bg-background/10 hover:text-background">
              <Play className="h-4 w-4" />
              Watch Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </div>
    </section>
  );
}
