// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  role: 'admin' | 'user' | 'agent';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  location: string;
  locationAr: string;
  latitude: number;
  longitude: number;
  images: string[];
  priceFrom: number;
  priceTo: number;
  currency: string;
  totalUnits: number;
  availableUnits: number;
  amenities: string[];
  developerId: string;
  zoneId: string;
  status: 'upcoming' | 'under-construction' | 'ready' | 'sold-out';
  completionDate: string;
  createdAt: string;
}

// Unit Types
export interface Unit {
  id: string;
  name: string;
  nameAr: string;
  type: 'villa' | 'apartment' | 'townhouse' | 'duplex' | 'penthouse' | 'studio';
  projectId: string;
  description: string;
  descriptionAr: string;
  images: string[];
  price: number;
  currency: string;
  area: number;
  areaUnit: 'sqm' | 'sqft';
  bedrooms: number;
  bathrooms: number;
  floors: number;
  parkingSpaces: number;
  features: string[];
  status: 'available' | 'reserved' | 'sold';
  floorPlan?: string;
  virtualTour?: string;
  createdAt: string;
}

// Zone Types
export interface Zone {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  location: string;
  projectCount: number;
  unitCount: number;
  createdAt: string;
}

// Developer Types
export interface Developer {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  logo: string;
  website: string;
  projectsCount: number;
  establishedYear: number;
  headquarters: string;
  createdAt: string;
}

// Developer Progress Types
export interface DeveloperProgress {
  id: string;
  projectId: string;
  title: string;
  description: string;
  progress: number;
  images: string[];
  milestone: string;
  expectedCompletion: string;
  updatedAt: string;
}

// Contact Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectId?: string;
  unitId?: string;
  createdAt: string;
}

// Image Types
export interface ImageUpload {
  id: string;
  url: string;
  alt: string;
  type: 'project' | 'unit' | 'zone' | 'developer' | 'general';
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
