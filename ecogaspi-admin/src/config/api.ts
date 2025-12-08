import env from './environment';

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: env.buildApiUrl('auth/login'),
    logout: env.buildApiUrl('auth/logout'),
    refresh: env.buildApiUrl('auth/refresh'),
    me: env.buildApiUrl('auth/me')
  },

  // Merchants
  merchants: {
    list: env.buildApiUrl('merchants'),
    create: env.buildApiUrl('merchants'),
    getById: (id: string) => env.buildApiUrl(`merchants/${id}`),
    update: (id: string) => env.buildApiUrl(`merchants/${id}`),
    delete: (id: string) => env.buildApiUrl(`merchants/${id}`),
    verify: (id: string) => env.buildApiUrl(`merchants/${id}/verify`),
    suspend: (id: string) => env.buildApiUrl(`merchants/${id}/suspend`),
    stats: env.buildApiUrl('merchants/stats')
  },

  // Products
  products: {
    list: env.buildApiUrl('products'),
    create: env.buildApiUrl('products'),
    getById: (id: string) => env.buildApiUrl(`products/${id}`),
    update: (id: string) => env.buildApiUrl(`products/${id}`),
    delete: (id: string) => env.buildApiUrl(`products/${id}`),
    approve: (id: string) => env.buildApiUrl(`products/${id}/approve`),
    reject: (id: string) => env.buildApiUrl(`products/${id}/reject`),
    expiringSoon: env.buildApiUrl('products/expiring-soon'),
    stats: env.buildApiUrl('products/stats')
  },

  // Transactions
  transactions: {
    list: env.buildApiUrl('transactions'),
    getById: (id: string) => env.buildApiUrl(`transactions/${id}`),
    stats: env.buildApiUrl('transactions/stats'),
    commission: env.buildApiUrl('transactions/commission')
  },

  // Messages
  messages: {
    list: env.buildApiUrl('messages'),
    moderate: (id: string) => env.buildApiUrl(`messages/${id}/moderate`),
    delete: (id: string) => env.buildApiUrl(`messages/${id}`),
    stats: env.buildApiUrl('messages/stats')
  },

  // Reports
  reports: {
    list: env.buildApiUrl('reports'),
    getById: (id: string) => env.buildApiUrl(`reports/${id}`),
    resolve: (id: string) => env.buildApiUrl(`reports/${id}/resolve`),
    dismiss: (id: string) => env.buildApiUrl(`reports/${id}/dismiss`)
  },

  // Statistics
  statistics: {
    dashboard: env.buildApiUrl('statistics/dashboard'),
    merchants: env.buildApiUrl('statistics/merchants'),
    products: env.buildApiUrl('statistics/products'),
    transactions: env.buildApiUrl('statistics/transactions'),
    revenue: env.buildApiUrl('statistics/revenue'),
    geography: env.buildApiUrl('statistics/geography')
  },

  // Content Management
  content: {
    categories: env.buildApiUrl('content/categories'),
    policies: env.buildApiUrl('content/policies'),
    announcements: env.buildApiUrl('content/announcements')
  },

  // Settings
  settings: {
    general: env.buildApiUrl('settings/general'),
    notifications: env.buildApiUrl('settings/notifications'),
    security: env.buildApiUrl('settings/security')
  },

  // File uploads
  upload: {
    image: env.buildApiUrl('upload/image'),
    document: env.buildApiUrl('upload/document'),
    avatar: env.buildApiUrl('upload/avatar')
  }
};

// Helper function to get image URL
export const getImageUrl = (filename: string): string => {
  if (!filename) return '';

  // If it's already a full URL, return as is
  if (filename.startsWith('http') || filename.startsWith('data:')) {
    return filename;
  }

  // Build upload URL
  return env.buildUploadUrl(filename);
};

// WebSocket configuration
export const WEBSOCKET_CONFIG = {
  url: env.websocketUrl,
  reconnectInterval: 5000,
  maxReconnectAttempts: 5
};

// API configuration
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_ENDPOINTS;