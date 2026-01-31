import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { LoginRequest, LoginResponse, UserInfo } from '../types';

class AuthService {
  private readonly TOKEN_KEY = 'ecogaspi_admin_token';
  private readonly REFRESH_TOKEN_KEY = 'ecogaspi_admin_refresh_token';
  private readonly USER_KEY = 'ecogaspi_admin_user';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Clear any existing auth data before login attempt
      this.clearAuthData();

      console.log('🔐 Tentative de connexion avec:', credentials.phoneNumber);
      console.log('🔐 URL utilisée:', API_ENDPOINTS.auth.login);

      // Utiliser apiClient pour la cohérence avec le reste de l'application
      const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Erreur de connexion inconnue');
      }

      const loginData = response.data;
      console.log('✅ Connexion réussie, données reçues:', loginData);

      // Vérifier que l'utilisateur a des droits d'admin
      const hasAdminRole = loginData.user.roles.some(role =>
        role === 'SUPER_ADMIN' || role === 'ADMIN_SHOP'
      );

      if (!hasAdminRole) {
        throw new Error('Accès non autorisé. Droits administrateur requis.');
      }

      // Stocker les données d'authentification
      this.setAuthData(loginData);

      return loginData;
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error('Token de rafraîchissement manquant');
      }

      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.auth.refresh,
        { refreshToken }
      );

      if (response.success && response.data) {
        const loginData = response.data;
        this.setAuthData(loginData);
        return loginData;
      }

      throw new Error('Impossible de rafraîchir le token');
    } catch (error: any) {
      console.error('❌ Erreur de rafraîchissement du token:', error);
      this.clearAuthData();
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getToken();

      if (token) {
        // Appel API pour logout côté serveur (optionnel)
        await apiClient.post(API_ENDPOINTS.auth.logout).catch(error => {
          console.warn('⚠️ Erreur lors de la déconnexion côté serveur:', error);
        });
      }
    } catch (error) {
      console.warn('⚠️ Erreur lors de la déconnexion côté serveur:', error);
    } finally {
      // Toujours nettoyer les données locales
      console.log('🔐 Nettoyage des données d\'authentification...');
      this.clearAuthData();
    }
  }

  // Getters pour les données stockées
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUser(): UserInfo | null {
    try {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('❌ Erreur lors de la lecture des données utilisateur:', error);
      return null;
    }
  }

  // Vérification de l'état d'authentification
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();

    return !!(token && user && this.hasAdminRole(user));
  }

  // Vérification des rôles admin
  hasAdminRole(user: UserInfo): boolean {
    return user.roles.some(role =>
      role === 'SUPER_ADMIN' || role === 'ADMIN_SHOP'
    );
  }

  // Vérification du rôle super admin
  isSuperAdmin(user: UserInfo): boolean {
    return user.roles.includes('SUPER_ADMIN');
  }

  // Méthodes privées pour la gestion du stockage
  private setAuthData(loginData: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, loginData.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, loginData.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(loginData.user));

    // Configurer le client API avec le nouveau token
    apiClient.setAuthToken(loginData.accessToken);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    // Nettoyer le client API
    apiClient.clearAuthToken();
  }

  // Initialisation au démarrage de l'application
  initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      apiClient.setAuthToken(token);
    }
  }

  // Vérification de l'expiration du token (optionnel)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Décoder le JWT pour vérifier l'expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de l\'expiration du token:', error);
      return true;
    }
  }

  // Méthode pour obtenir l'en-tête d'autorisation
  getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }
}

export const authService = new AuthService();
export default authService;