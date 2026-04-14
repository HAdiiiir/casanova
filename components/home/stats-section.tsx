"use client";

import { useEffect, useState, useRef } from "react";
import { Building2, Users, MapPin, Award } from "lucide-react";

const stats = [
  { 
    label: "Properties Sold", 
    value: 2500, 
    suffix: "+",
    icon: Building2,
    description: "Happy homeowners"
  },
  { 
    label: "Years Experience", 
    value: 25, 
    suffix: "+",
    icon: Award,
    description: "In real estate"
  },
  { 
    label: "Active Listings", 
    value: 850, 
    suffix: "",
    icon: MapPin,
    description: "Properties available"
  },
  { 
    label: "Satisfied Clients", 
    value: 5000, 
    suffix: "+",
    icon: Users,
    description: "And counting"
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative -mt-16 z-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-2xl bg-card shadow-xl border border-border/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/50">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label} 
                  className="flex flex-col items-center justify-center p-6 lg:p-8 text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-foreground mb-0.5">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
