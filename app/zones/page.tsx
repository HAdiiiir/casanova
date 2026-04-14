import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { zones } from "@/lib/data";
import { Building2, FolderKanban, ArrowRight, MapPin } from "lucide-react";

const zoneImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop',
];

export default function ZonesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Prime Locations</Badge>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-4">
            Explore Our Zones
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover Egypt&apos;s most prestigious areas and find your perfect location for luxury living
          </p>
        </div>
      </section>

      {/* Zones Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {zones.map((zone, index) => (
              <Link key={zone.id} href={`/zones/${zone.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={zoneImages[index % zoneImages.length]}
                      alt={zone.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-background mb-2">
                        {zone.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-background/80 text-sm mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{zone.location}</span>
                      </div>
                      <p className="text-background/80 line-clamp-2 mb-4">
                        {zone.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-background text-sm bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <FolderKanban className="h-4 w-4" />
                          <span>{zone.projectCount} Projects</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-background text-sm bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <Building2 className="h-4 w-4" />
                          <span>{zone.unitCount} Units</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{zones.length}</p>
              <p className="text-muted-foreground">Prime Zones</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {zones.reduce((sum, z) => sum + z.projectCount, 0)}
              </p>
              <p className="text-muted-foreground">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {zones.reduce((sum, z) => sum + z.unitCount, 0).toLocaleString()}
              </p>
              <p className="text-muted-foreground">Available Units</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">25+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
