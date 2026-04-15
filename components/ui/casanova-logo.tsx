"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CasanovaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
  href?: string;
  className?: string;
  variant?: "light" | "dark";
}

export function CasanovaLogo({ 
  size = "md", 
  showText = true, 
  animated = true,
  href = "/",
  className = "",
  variant = "dark"
}: CasanovaLogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg", subtitle: "text-[8px]" },
    md: { icon: 40, text: "text-xl", subtitle: "text-[10px]" },
    lg: { icon: 56, text: "text-3xl", subtitle: "text-xs" },
  };

  const currentSize = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const subtitleColor = variant === "light" ? "text-white/60" : "text-muted-foreground";

  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Animated Logo Icon */}
      <motion.div
        className="relative"
        initial={animated ? { scale: 0, rotate: -180 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Background Circle */}
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            className="fill-primary"
            initial={animated ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          />
          
          {/* Stylized C for Casanova */}
          <motion.path
            d="M40 20C40 20 28 18 22 26C16 34 18 46 28 50C38 54 46 48 46 48"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={animated ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Crown/Building Element */}
          <motion.path
            d="M26 30L32 24L38 30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={animated ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          />
          
          {/* Decorative Dot */}
          <motion.circle
            cx="32"
            cy="40"
            r="3"
            fill="white"
            initial={animated ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        </svg>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10"
          initial={animated ? { opacity: 0, scale: 0.5 } : false}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={animated ? { opacity: 0, x: -20 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className={`font-serif font-bold tracking-tight ${currentSize.text} ${textColor}`}>
            Casanova
          </span>
          <span className={`uppercase tracking-[0.2em] ${currentSize.subtitle} ${subtitleColor}`}>
            Real Estate
          </span>
        </motion.div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}