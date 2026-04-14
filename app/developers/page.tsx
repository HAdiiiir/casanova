import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { developers } from "@/lib/data";
import { Building2, Globe, Calendar, ArrowRight, MapPin } from "lucide-react";

const developerImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464938050520-ef2571f65923?q=80&w=800&auto=format&fit=crop',
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Our Partners</Badge>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-background mb-4">
            Trusted Developers
          </h1>
          <p className="text-lg text-background/80 max-w-2xl mx-auto">
            We partner with Egypt&apos;s leading real estate developers to bring you the finest properties and developments
          </p>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer, index) => (
              <Link key={developer.id} href={`/developers/${developer.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Header Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={developerImages[index % developerImages.length]}
                      alt={developer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                    
                    {/* Logo */}
                    <div className="absolute bottom-4 left-4">
                      <div className="h-16 w-16 rounded-xl bg-background shadow-lg flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {developer.name}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {developer.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{developer.projectsCount} Projects</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Est. {developer.establishedYear}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{developer.headquarters}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      View Developer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-foreground mb-2">{developers.length}</p>
              <p className="text-primary-foreground/80">Partner Developers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-foreground mb-2">
                {developers.reduce((sum, d) => sum + d.projectsCount, 0)}
              </p>
              <p className="text-primary-foreground/80">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-foreground mb-2">25+</p>
              <p className="text-primary-foreground/80">Years Combined</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-foreground mb-2">50K+</p>
              <p className="text-primary-foreground/80">Units Delivered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
