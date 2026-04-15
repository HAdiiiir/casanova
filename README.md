# CasaNova Real Estate - Full Documentation

A comprehensive luxury real estate website built with Next.js 15, featuring property listings, interactive maps, developer profiles, and a modern UI design.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Pages Documentation](#pages-documentation)
6. [Components Documentation](#components-documentation)
7. [Data Models & Types](#data-models--types)
8. [Styling System](#styling-system)
9. [Installation & Setup](#installation--setup)
10. [Development](#development)
11. [Deployment](#deployment)
12. [Future Enhancements](#future-enhancements)

---

## Project Overview

**CasaNova Real Estate** is a modern, fully responsive real estate platform designed for the Egyptian market. The platform showcases luxury properties including villas, apartments, townhouses, penthouses, and duplexes across various zones and compounds.

### Key Highlights

- **Luxury Design**: Premium UI with warm terracotta/brown color palette
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Performance Optimized**: Built with Next.js 15 App Router for optimal performance
- **SEO Ready**: Proper metadata and semantic HTML structure
- **Accessibility**: ARIA labels and keyboard navigation support

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | React framework with App Router, SSR, and file-based routing |
| **React** | 19.x | UI component library |
| **TypeScript** | 5.7.x | Type-safe JavaScript |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.2.x | Utility-first CSS framework |
| **tw-animate-css** | 1.3.x | Animation utilities for Tailwind |
| **class-variance-authority** | - | Component variant management |
| **clsx** | - | Conditional class name utility |
| **tailwind-merge** | - | Merge Tailwind classes without conflicts |

### UI Components

| Technology | Purpose |
|------------|---------|
| **shadcn/ui** | Pre-built accessible UI components |
| **Radix UI** | Headless UI primitives (Dialog, Select, Tabs, etc.) |
| **Lucide React** | Beautiful icon library |

### Fonts

| Font | Usage |
|------|-------|
| **Playfair Display** | Headings and titles (serif, elegant) |
| **Inter** | Body text and UI elements (sans-serif, readable) |

### Additional Libraries

| Library | Purpose |
|---------|---------|
| **Sonner** | Toast notifications |
| **Embla Carousel** | Image carousels and sliders |
| **React Hook Form** | Form handling (if needed) |
| **Zod** | Schema validation (if needed) |

---

## Project Structure

```
al-amal-real-estate/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with Header & Footer
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & design tokens
│   │
│   ├── units/                    # Units (Properties) pages
│   │   ├── page.tsx              # Units listing with filters
│   │   └── [id]/
│   │       └── page.tsx          # Unit details page
│   │
│   ├── projects/                 # Projects (Compounds) pages
│   │   ├── page.tsx              # Projects listing
│   │   └── [id]/
│   │       └── page.tsx          # Project details page
│   │
│   ├── zones/                    # Zones (Areas) pages
│   │   ├── page.tsx              # Zones listing
│   │   └── [id]/
│   │       └── page.tsx          # Zone details page
│   │
│   ├── developers/               # Developers pages
│   │   ├── page.tsx              # Developers listing
│   │   └── [id]/
│   │       └── page.tsx          # Developer details page
│   │
│   ├── contact/                  # Contact page
│   │   └── page.tsx
│   │
│   ├── login/                    # Login page
│   │   └── page.tsx
│   │
│   └── register/                 # Registration page
│       └── page.tsx
│
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   ├── header.tsx            # Site header with navigation
│   │   └── footer.tsx            # Site footer
│   │
│   ├── home/                     # Home page sections
│   │   ├── hero-section.tsx      # Hero with search
│   │   ├── stats-section.tsx     # Statistics counter
│   │   ├── featured-projects.tsx # Featured projects carousel
│   │   ├── featured-units.tsx    # Featured units grid
│   │   ├── zones-section.tsx     # Zones overview
│   │   ├── map-section.tsx       # Interactive map
│   │   └── cta-section.tsx       # Call to action
│   │
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── carousel.tsx
│       └── ... (more components)
│
├── lib/                          # Utilities and data
│   ├── utils.ts                  # Helper functions (cn, formatPrice, etc.)
│   ├── types.ts                  # TypeScript interfaces
│   └── data.ts                   # Mock data for development
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.tsx            # Mobile detection hook
│
├── public/                       # Static assets
│   └── images/
│
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── postcss.config.mjs            # PostCSS configuration
```

---

## Features

### 1. Property Listings (Units)

**Location**: `/units`

| Feature | Description |
|---------|-------------|
| **Advanced Filtering** | Filter by property type, price range, area, bedrooms, zone |
| **Search** | Search by property name or location |
| **Sorting** | Sort by price (low/high), area, date added |
| **Grid View** | Responsive card grid layout |
| **Pagination** | Load more functionality |

**Unit Details** (`/units/[id]`):
- Image gallery with carousel
- Property specifications (area, bedrooms, bathrooms, floors)
- Amenities list with icons
- Location on map
- Price and payment information
- Contact form for inquiries
- Related units suggestions

### 2. Projects (Compounds)

**Location**: `/projects`

| Feature | Description |
|---------|-------------|
| **Project Cards** | Visual cards with key information |
| **Developer Info** | Link to developer profile |
| **Zone Filter** | Filter by location/zone |
| **Status Badge** | Ready, Under Construction, Launching Soon |

**Project Details** (`/projects/[id]`):
- Project overview and description
- Available unit types with pricing
- Project amenities (pools, gyms, security, etc.)
- Developer information
- Location details
- Image gallery

### 3. Zones (Areas)

**Location**: `/zones`

| Feature | Description |
|---------|-------------|
| **Zone Cards** | Visual representation of each zone |
| **Project Count** | Number of projects per zone |
| **Unit Count** | Available units in zone |
| **Price Range** | Starting prices |

**Zone Details** (`/zones/[id]`):
- Zone description and highlights
- Projects within the zone
- Available units
- Location information

### 4. Developers

**Location**: `/developers`

| Feature | Description |
|---------|-------------|
| **Developer Profiles** | Company information and logo |
| **Project Portfolio** | Number of projects |
| **Years in Business** | Establishment year |
| **Rating** | Customer rating |

**Developer Details** (`/developers/[id]`):
- Company overview
- All projects by developer
- Company statistics
- Contact information

### 5. Interactive Map

**Location**: Home page (`/`)

| Feature | Description |
|---------|-------------|
| **Zone Markers** | Clickable markers for each zone |
| **Hover Info** | Quick info on hover |
| **Click Navigation** | Navigate to zone details |
| **Visual Design** | Styled map representation |

### 6. Search Functionality

**Location**: Hero section on home page

| Feature | Description |
|---------|-------------|
| **Property Type** | Select villa, apartment, etc. |
| **Zone Selection** | Choose location |
| **Price Range** | Set budget |
| **Quick Search** | One-click search |

### 7. Authentication (UI Only)

**Login** (`/login`):
- Email/password form
- Remember me option
- Forgot password link
- Social login buttons (Google, Apple)

**Register** (`/register`):
- Full registration form
- Name, email, phone, password
- Terms acceptance
- Account type selection

### 8. Contact Page

**Location**: `/contact`

| Feature | Description |
|---------|-------------|
| **Contact Form** | Name, email, phone, message |
| **Office Locations** | Multiple office addresses |
| **Working Hours** | Business hours |
| **Direct Contact** | Phone numbers and email |
| **Social Links** | Social media profiles |

### 9. Responsive Design

| Breakpoint | Screen Size | Layout |
|------------|-------------|--------|
| **Mobile** | < 640px | Single column, hamburger menu |
| **Tablet** | 640px - 1024px | 2 columns, adapted navigation |
| **Desktop** | > 1024px | Full layout, expanded navigation |

### 10. UI/UX Features

- **Smooth Animations**: Page transitions and hover effects
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Success/error feedback
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Images and components
- **Accessibility**: ARIA labels, keyboard navigation

---

## Pages Documentation

### Home Page (`/`)

```
┌─────────────────────────────────────┐
│           HEADER                    │
├─────────────────────────────────────┤
│                                     │
│        HERO SECTION                 │
│    (Background + Search Form)       │
│                                     │
├─────────────────────────────────────┤
│        STATS SECTION                │
│  (Properties | Clients | Projects)  │
├─────────────────────────────────────┤
│      FEATURED PROJECTS              │
│        (Carousel)                   │
├─────────────────────────────────────┤
│       FEATURED UNITS                │
│     (Grid of 6 units)               │
├─────────────────────────────────────┤
│       ZONES SECTION                 │
│    (Grid of zone cards)             │
├─────────────────────────────────────┤
│        MAP SECTION                  │
│   (Interactive zone markers)        │
├─────────────────────────────────────┤
│        CTA SECTION                  │
│   (Call to action banner)           │
├─────────────────────────────────────┤
│           FOOTER                    │
└─────────────────────────────────────┘
```

### Units Page (`/units`)

```
┌─────────────────────────────────────┐
│           HEADER                    │
├─────────────────────────────────────┤
│         PAGE HEADER                 │
│    "Find Your Perfect Property"     │
├─────────────────────────────────────┤
│         FILTERS BAR                 │
│ [Type] [Zone] [Price] [Beds] [Sort] │
├─────────────────────────────────────┤
│                                     │
│         UNITS GRID                  │
│    ┌────┐ ┌────┐ ┌────┐            │
│    │    │ │    │ │    │            │
│    └────┘ └────┘ └────┘            │
│    ┌────┐ ┌────┐ ┌────┐            │
│    │    │ │    │ │    │            │
│    └────┘ └────┘ └────┘            │
│                                     │
├─────────────────────────────────────┤
│       [Load More Button]            │
├─────────────────────────────────────┤
│           FOOTER                    │
└─────────────────────────────────────┘
```

### Unit Details (`/units/[id]`)

```
┌─────────────────────────────────────┐
│           HEADER                    │
├─────────────────────────────────────┤
│       BREADCRUMB NAV                │
├─────────────────────────────────────┤
│                                     │
│       IMAGE GALLERY                 │
│     (Main + Thumbnails)             │
│                                     │
├──────────────────┬──────────────────┤
│                  │                  │
│  PROPERTY INFO   │   CONTACT FORM   │
│  - Title         │   - Name         │
│  - Price         │   - Email        │
│  - Location      │   - Phone        │
│  - Specs         │   - Message      │
│                  │                  │
├──────────────────┴──────────────────┤
│         AMENITIES                   │
│   (Grid of amenity icons)           │
├─────────────────────────────────────┤
│       DESCRIPTION                   │
├──────────────────────────────────��──┤
│       RELATED UNITS                 │
├─────────────────────────────────────┤
│           FOOTER                    │
└─────────────────────────────────────┘
```

---

## Components Documentation

### Layout Components

#### Header (`components/layout/header.tsx`)

```typescript
// Features:
// - Sticky header with blur effect on scroll
// - Responsive navigation (hamburger menu on mobile)
// - Active link highlighting
// - Login/Register buttons
// - Logo with home link

// Usage:
<Header />
```

#### Footer (`components/layout/footer.tsx`)

```typescript
// Features:
// - Company information and logo
// - Quick links navigation
// - Property types links
// - Contact information
// - Newsletter subscription
// - Social media links
// - Copyright notice

// Usage:
<Footer />
```

### Home Page Components

#### HeroSection (`components/home/hero-section.tsx`)

```typescript
// Features:
// - Full-screen background image
// - Animated text reveal
// - Property search form
// - Property type tabs (Buy/Rent/Commercial)
// - Quick search filters

// Usage:
<HeroSection />
```

#### StatsSection (`components/home/stats-section.tsx`)

```typescript
// Features:
// - Animated number counters
// - Statistics display (properties, clients, projects, years)
// - Intersection observer for animation trigger

// Usage:
<StatsSection />
```

#### FeaturedProjects (`components/home/featured-projects.tsx`)

```typescript
// Features:
// - Carousel/slider of project cards
// - Auto-play functionality
// - Navigation arrows
// - Project quick info

// Usage:
<FeaturedProjects />
```

#### FeaturedUnits (`components/home/featured-units.tsx`)

```typescript
// Features:
// - Grid of unit cards
// - Property type badges
// - Price and specs display
// - Hover effects

// Usage:
<FeaturedUnits />
```

#### ZonesSection (`components/home/zones-section.tsx`)

```typescript
// Features:
// - Zone cards grid
// - Image backgrounds
// - Project/unit counts
// - Hover zoom effect

// Usage:
<ZonesSection />
```

#### MapSection (`components/home/map-section.tsx`)

```typescript
// Features:
// - Visual map representation
// - Clickable zone markers
// - Tooltip on hover
// - Zone navigation

// Usage:
<MapSection />
```

#### CTASection (`components/home/cta-section.tsx`)

```typescript
// Features:
// - Call to action banner
// - Contact buttons
// - Background pattern

// Usage:
<CTASection />
```

---

## Data Models & Types

### Unit (Property)

```typescript
interface Unit {
  id: string;
  title: string;
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse' | 'duplex';
  status: 'available' | 'sold' | 'reserved';
  price: number;
  area: number;              // in square meters
  bedrooms: number;
  bathrooms: number;
  floors?: number;
  description: string;
  features: string[];        // amenities list
  images: string[];
  location: {
    zone: string;
    zoneId: string;
    project: string;
    projectId: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  developer: {
    id: string;
    name: string;
  };
  createdAt: string;
  featured: boolean;
}
```

### Project (Compound)

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ready' | 'under-construction' | 'launching-soon';
  developer: {
    id: string;
    name: string;
    logo?: string;
  };
  zone: {
    id: string;
    name: string;
  };
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  unitTypes: {
    type: string;
    startingPrice: number;
    availableUnits: number;
  }[];
  amenities: string[];
  images: string[];
  totalUnits: number;
  availableUnits: number;
  startingPrice: number;
  completionDate?: string;
  featured: boolean;
}
```

### Zone (Area)

```typescript
interface Zone {
  id: string;
  name: string;
  description: string;
  image: string;
  projectCount: number;
  unitCount: number;
  startingPrice: number;
  highlights: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

### Developer

```typescript
interface Developer {
  id: string;
  name: string;
  logo: string;
  description: string;
  founded: number;
  projectCount: number;
  completedProjects: number;
  rating: number;
  headquarters: string;
  website?: string;
  phone?: string;
  email?: string;
}
```

---

## Styling System

### Color Palette

```css
/* Primary Colors */
--primary: oklch(0.55 0.12 45);           /* Terracotta Brown */
--primary-foreground: oklch(0.98 0.01 80); /* Light Cream */

/* Accent Colors */
--accent: oklch(0.35 0.08 150);            /* Deep Teal */
--accent-foreground: oklch(0.98 0.01 80);

/* Neutral Colors */
--background: oklch(0.97 0.01 80);         /* Warm Off-White */
--foreground: oklch(0.2 0.02 30);          /* Dark Brown */
--muted: oklch(0.94 0.01 80);              /* Light Gray */
--muted-foreground: oklch(0.45 0.02 30);   /* Medium Gray */

/* Functional Colors */
--destructive: oklch(0.577 0.245 27.325);  /* Error Red */
--border: oklch(0.88 0.02 80);             /* Border Color */
```

### Typography

```css
/* Heading Font */
font-family: 'Playfair Display', Georgia, serif;
/* Usage: Titles, headings, brand text */

/* Body Font */
font-family: 'Inter', system-ui, sans-serif;
/* Usage: Body text, UI elements, navigation */
```

### Spacing Scale

```css
/* Tailwind Default Scale */
4   = 1rem    = 16px
6   = 1.5rem  = 24px
8   = 2rem    = 32px
12  = 3rem    = 48px
16  = 4rem    = 64px
```

### Border Radius

```css
--radius: 0.5rem;  /* Default border radius */
```

---

## Installation & Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **pnpm**, or **yarn**

### Step 1: Clone or Download

```bash
# Option A: Clone from repository
git clone https://github.com/your-username/al-amal-real-estate.git
cd casanova-real-estate

# Option B: Download from v0
# Use the Download ZIP option from v0 interface
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### Step 3: Configure Environment

Create `.env.local` file (if needed):

```env
# Add any environment variables here
# Currently not required for mock data version
```

### Step 4: Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Adding New Components

1. Create component in appropriate directory:
   - `/components/ui/` for reusable UI components
   - `/components/home/` for home page sections
   - `/components/layout/` for layout components

2. Use TypeScript interfaces for props

3. Follow existing naming conventions

### Adding New Pages

1. Create folder in `/app/` directory
2. Add `page.tsx` file
3. For dynamic routes, use `[param]` folder naming

Example:
```
app/
  new-page/
    page.tsx           # /new-page
    [id]/
      page.tsx         # /new-page/123
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

Or use the v0 "Publish" button for instant deployment.

### Manual Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

No environment variables required for the current mock data version.

For production with real backend:
```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
```

---

## Future Enhancements

### Backend Integration

- [ ] Connect to Supabase for database
- [ ] Implement real authentication
- [ ] Add user dashboard
- [ ] Favorites/wishlist functionality
- [ ] Search history

### Features to Add

- [ ] Advanced map with real coordinates (Leaflet/Mapbox)
- [ ] Virtual property tours
- [ ] Mortgage calculator
- [ ] Appointment booking system
- [ ] Live chat support
- [ ] Multi-language support (Arabic/English)
- [ ] Currency converter
- [ ] Property comparison tool
- [ ] Email notifications
- [ ] SMS alerts for new properties

### Performance

- [ ] Image CDN integration
- [ ] Caching strategy
- [ ] API rate limiting
- [ ] Search optimization

---

## Support

For questions or issues:
- Create an issue in the repository
- Contact: info@alamal.com

---

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Built with love using Next.js 15 and shadcn/ui**