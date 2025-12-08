export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
  images: string[];
  expiryDate: string;
  quantity: number;
  unit: string;
  merchant: Merchant;
  location: Location;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merchant {
  id: string;
  name: string;
  type: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  address: string;
  phone: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
  distance?: number;
}