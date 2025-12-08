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
  merchantCard?: string;
  storePhoto?: string;
  status: 'boutique' | 'depot' | 'grossiste' | 'industriel';
  verified: boolean;
  createdAt: Date;
  isActive: boolean;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  lotPrice: number;
  expirationDate: Date;
  photos?: string[];
  description?: string;
  condition: 'parfait' | 'presque_expire' | 'rotation_lente';
  location: string;
  status: 'active' | 'sold' | 'expired' | 'draft';
  views: number;
  createdAt: Date;
  updatedAt: Date;
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
  isVerified: boolean;
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