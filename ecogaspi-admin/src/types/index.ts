export interface Merchant {
  id: string;
  name: string;
  storeName: string;
  phone: string;
  email?: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  wallet: string;
  rccm?: string;
  patente?: string;
  ninea?: string;
  merchantCard?: string;
  storePhoto?: string;
  status: 'boutique' | 'depot' | 'grossiste' | 'industriel';
  verified: boolean;
  createdAt: Date;
  isActive: boolean;
}

export interface Business {
  id: number;
  businessName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  walletNumber: string;
  businessImageUrl?: string;
  website?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  categoryId: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number | string; // L'API retourne un nombre, mais on garde la flexibilité
  businessId: number;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  bulkPrice: number; // Correspond à lotPrice dans l'ancienne interface
  unit: string;
  expirationDate: string; // L'API retourne une chaîne de caractères ISO
  condition: 'ETAT_PARFAIT' | 'PRESQUE_EXPIRE' | 'ROTATION_LENT' | string; // Adapter les valeurs
  imageUrls?: string[];
  primaryImageUrl?: string;
  isActive: boolean;
  createdAt: string; // L'API retourne une chaîne de caractères ISO
  updatedAt: string; // L'API retourne une chaîne de caractères ISO
  views: number;
  location: string;
  isFeatured: boolean;
  business?: Business; // Informations sur le commerçant
  // Anciennes propriétés conservées pour la compatibilité
  merchantId?: string;
  lotPrice?: number;
  photos?: string[];
  status?: 'active' | 'sold' | 'expired' | 'draft';
  conditionAncienne?: 'parfait' | 'presque_expire' | 'rotation_lente';
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  commission: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'offer';
  timestamp: Date;
  read: boolean;
}

export interface DashboardStats {
  totalMerchants: number;
  activeMerchants: number;
  totalProducts: number;
  activeProducts: number;
  totalTransactions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingVerifications: number;
}

// Auth Types
export type UserRole = 'SUPER_ADMIN' | 'ADMIN_SHOP' | 'VENDEUR' | 'CLIENT';

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface UserInfo {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  roles: UserRole[];
  businessId?: string;
  verified: boolean;
  profileImageUrl?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserInfo;
}

export interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin: Date;
}

// Business Categories Types
export interface BusinessCategory {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessCategoryRequest {
  name: string;
  description: string;
  iconUrl?: string;
}

export interface UpdateBusinessCategoryRequest {
  name: string;
  description: string;
  iconUrl?: string;
}