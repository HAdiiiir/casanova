"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Navigation,
  Building2,
  Car,
  Train
} from "lucide-react";

const offices = [
  {
    name: "Head Office - Smart Village",
    address: "Building 15, Smart Village, 6th October, Giza, Egypt",
    phone: "+20 100 123 4567",
    email: "info@casanovarealestate.com",
    hours: "Sun-Thu: 9:00 AM - 6:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d30.123456!3d30.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSmart%20Village!5e0!3m2!1sen!2seg!4v1234567890",
    directions: [
      { icon: Car, text: "30 minutes from Downtown Cairo via Ring Road" },
      { icon: Train, text: "5 minutes from Smart Village metro station" },
    ],
  },
  {
    name: "New Cairo Branch",
    address: "Cairo Festival City Mall, Ring Road, New Cairo, Egypt",
    phone: "+20 100 234 5678",
    email: "newcairo@casanovarealestate.com",
    hours: "Daily: 10:00 AM - 10:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.123456!3d30.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCairo%20Festival%20City!5e0!3m2!1sen!2seg!4v1234567890",
    directions: [
      { icon: Car, text: "20 minutes from Nasr City via Ring Road" },
      { icon: Building2, text: "Located inside Cairo Festival City Mall, Level 1" },
    ],
  },
  {
    name: "North Coast Office",
    address: "Hacienda White, KM 200 Alexandria-Matrouh Road, North Coast",
    phone: "+20 100 345 6789",
    email: "northcoast@casanovarealestate.com",
    hours: "Summer Season: Daily 10:00 AM - 8:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d28.123456!3d31.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHacienda%20White!5e0!3m2!1sen!2seg!4v1234567890",
    directions: [
      { icon: Car, text: "2.5 hours from Cairo via Alexandria Desert Road" },
      { icon: Navigation, text: "KM 200 marker on Alexandria-Matrouh Road" },
    ],
  },
  {
    name: "New Capital Branch",
    address: "Business District, R7 Zone, New Administrative Capital",
    phone: "+20 100 456 7890",
    email: "newcapital@casanovarealestate.com",
    hours: "Sun-Thu: 9:00 AM - 5:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.456!3d30.456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew%20Capital!5e0!3m2!1sen!2seg!4v1234567890",
    directions: [
      { icon: Car, text: "45 minutes from New Cairo via Suez Road" },
      { icon: Building2, text: "Located in R7 Business District, Tower 5" },
    ],
  },
];

const serviceAreas = [
  { name: "New Cairo", projects: 45, units: 850 },
  { name: "6th of October", projects: 38, units: 720 },
  { name: "North Coast", projects: 25, units: 580 },
  { name: "New Capital", projects: 32, units: 640 },
  { name: "Ain Sokhna", projects: 18, units: 320 },
  { name: "Sheikh Zayed", projects: 22, units: 410 },
];

export default function LocationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Our Locations
            </h1>
            <p className="text-lg text-muted-foreground">
              Visit us at any of our offices across Egypt. Our team is ready to help you find your perfect property.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-12">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-2">
                    {/* Map */}
                    <div className="h-[300px] lg:h-auto bg-muted relative">
                      <iframe
                        src={office.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: "300px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${office.name}`}
                      />
                    </div>

                    {/* Info */}
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold font-serif mb-4">{office.name}</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-muted-foreground">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-primary">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">{office.hours}</span>
                        </div>
                      </div>

                      {/* Directions */}
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-3">How to Get Here</h3>
                        <div className="space-y-2">
                          {office.directions.map((dir, idx) => {
                            const Icon = dir.icon;
                            return (
                              <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Icon className="h-4 w-4 text-primary" />
                                <span>{dir.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>
                            <Navigation className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>
                        </a>
                        <a href={`tel:${office.phone}`}>
                          <Button variant="outline">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Office
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif mb-4">Areas We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have properties and projects across Egypt&apos;s most sought-after locations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/zones?search=${encodeURIComponent(area.name)}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{area.name}</h3>
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <div>
                          <span className="font-semibold text-foreground">{area.projects}</span> Projects
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">{area.units}</span> Units
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-serif mb-6">
              Schedule a Visit
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Ready to explore properties? Visit any of our offices or schedule an appointment with our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/units">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}