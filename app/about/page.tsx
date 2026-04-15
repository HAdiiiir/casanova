"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Code2,
  Github,
  Linkedin,
  Globe
} from "lucide-react";

const stats = [
  { label: "Years Experience", value: "25+", icon: Award },
  { label: "Properties Sold", value: "5,000+", icon: Building2 },
  { label: "Happy Clients", value: "10,000+", icon: Users },
  { label: "Active Listings", value: "500+", icon: Target },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We prioritize our clients' needs and work tirelessly to exceed their expectations in finding their perfect home.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We conduct our business with the highest ethical standards, ensuring transparency in every transaction.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from property selection to customer service.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We embrace new technologies and methods to provide the best real estate experience in Egypt.",
  },
];

const team = [
  {
    name: "Ahmed Hassan",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    description: "25 years of experience in Egyptian real estate market.",
  },
  {
    name: "Sarah Mohamed",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description: "Expert in luxury property sales and client relations.",
  },
  {
    name: "Omar Khalil",
    role: "Chief Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: "Ensures smooth operations across all departments.",
  },
  {
    name: "Nour Ali",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    description: "Leads our digital presence and brand strategy.",
  },
];

const milestones = [
  { year: "1999", event: "Casanova Real Estate founded in Cairo" },
  { year: "2005", event: "Expanded to New Cairo and 6th October" },
  { year: "2010", event: "Reached 1,000 properties sold milestone" },
  { year: "2015", event: "Launched North Coast division" },
  { year: "2020", event: "Digital transformation and online platform launch" },
  { year: "2024", event: "5,000+ properties sold, 10,000+ happy clients" },
];

// Website Developer Information
const developer = {
  name: "Hadeer Gamal El-Din Abdel-Azim",
  nameAr: "هدير جمال الدين عبد العظيم",
  role: "Full Stack Developer",
  experience: "4+ Years",
  description: "A passionate Full Stack Developer with over 4 years of experience in building modern, scalable web applications. Specialized in creating seamless user experiences with cutting-edge technologies.",
  skills: [
    "Next.js / React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL / MongoDB",
    "REST APIs / GraphQL",
    "UI/UX Design",
    "Responsive Design",
  ],
  social: {
    github: "https://github.com/Hadiiir",
    linkedin: "https://www.linkedin.com/in/hader-gamal-5847061b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    portfolio: "https://medium.com/@hader.jaamal2010/2c559f3c91e4",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              About Casanova Real Estate
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over 25 years, we have been helping families find their dream homes across Egypt. 
              Our commitment to excellence and customer satisfaction has made us one of the most 
              trusted names in Egyptian real estate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Icon className="h-10 w-10 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold font-serif mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-serif mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 1999, Casanova Real Estate began with a simple mission: to help 
                  Egyptian families find their perfect homes. What started as a small office 
                  in Cairo has grown into one of Egypt&apos;s most respected real estate companies.
                </p>
                <p>
                  Over the past 25 years, we have witnessed and been part of Egypt&apos;s real estate 
                  transformation. From the development of New Cairo to the rise of the North Coast 
                  as a premium destination, we have been there every step of the way.
                </p>
                <p>
                  Today, we work with the country&apos;s top developers to bring you the finest 
                  properties across Egypt. Our team of experienced professionals is dedicated 
                  to making your property journey smooth and successful.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/units">
                  <Button variant="outline" size="lg">
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Casanova Office"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Casanova Real Estate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our 25+ years of excellence.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-lg font-medium">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif mb-4">Our Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals leading Casanova Real Estate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Luxury Property"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-serif mb-6">Why Choose Casanova?</h2>
              <ul className="space-y-4">
                {[
                  "25+ years of market expertise",
                  "Partnerships with top developers",
                  "Comprehensive property portfolio",
                  "Dedicated customer support",
                  "Transparent pricing and processes",
                  "After-sale services and support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Website Developer Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-serif mb-4">Website Developer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This website was designed and developed with passion and expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Developer Image & Info */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-32 h-32 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6 border-4 border-primary-foreground/30">
                      <Code2 className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif mb-1">{developer.name}</h3>
                    <p className="text-xl text-primary-foreground/80 mb-2" dir="rtl">{developer.nameAr}</p>
                    <p className="text-primary-foreground/90 font-medium mb-4">{developer.role}</p>
                    <div className="flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5" />
                      <span>{developer.experience} Experience</span>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                      <a
                        href={developer.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.social.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                        aria-label="Portfolio"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Developer Details */}
                  <div className="p-8">
                    <h4 className="font-semibold text-lg mb-4">About the Developer</h4>
                    <p className="text-muted-foreground mb-6">{developer.description}</p>
                    
                    <h4 className="font-semibold text-lg mb-4">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {developer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-lg mb-3">Built With</h4>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> Next.js 15
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> TypeScript
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> Tailwind CSS
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> Framer Motion
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-primary" /> shadcn/ui
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-serif mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Let our experienced team help you find the perfect property. 
              Contact us today for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
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
