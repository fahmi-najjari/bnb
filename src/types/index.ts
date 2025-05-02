// types/index.ts

// -------------------------------------
// Coordinates and Location Types
// -------------------------------------
export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export interface Location {
    city: string;
    country: string;
    address?: string;
    coordinates?: Coordinates;
  }
  
  // -------------------------------------
  // Price and Host Types
  // -------------------------------------
  export interface Price {
    monthly: number;
    currency: string;
  }
  
  export interface Host {
    id: string;
    name: string;
    avatar: string;
    isSuperhost: boolean;
  }
  
  // -------------------------------------
  // Property Type
  // -------------------------------------
  export interface Property {
    id: string;
    title: string;
    location: Location;
    images: string[];
    description: string;
    price: Price;
    amenities: string[];
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    rating: number;
    reviewCount: number;
    host: Host;
    isFeatured?: boolean;
    isVerified?: boolean;
  }
  
  // -------------------------------------
  // User Type
  // -------------------------------------
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    favorites: string[];
  }
  
  // -------------------------------------
  // Review Type
  // -------------------------------------
  export interface Review {
    id: string;
    propertyId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
  }
  




