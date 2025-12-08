import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { LoginRequest, LoginResponse, UserInfo } from '../types';

class AuthService {
  private readonly TOKEN_KEY = 'ecogaspi_admin_token';
  private readonly REFRESH_TOKEN_KEY = 'ecogaspi_admin_refresh_token';
  private readonly USER_KEY = 'ecogaspi_admin_user';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.auth.login,
        credentials
      );

      if (response.success && response.data) {
        const loginData = response.data;

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
      }

      throw new Error('Réponse invalide du serveur');
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', error);
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Erreur de connexion'
      );
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
      // Appel API pour logout (optionnel selon l'API)
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.warn('⚠️ Erreur lors de la déconnexion côté serveur:', error);
    } finally {
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
    const user = this.getUser();
    if (!user) return true;

    // Si vous avez un champ d'expiration dans votre token
    // Vous pouvez décoder le JWT et vérifier l'expiration
    // Pour l'instant, on se base sur la présence du token et de l'utilisateur
    return !this.getToken();
  }

  // Méthode pour obtenir l'en-tête d'autorisation
  getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }
}

export const authService = new AuthService();
export default authService;