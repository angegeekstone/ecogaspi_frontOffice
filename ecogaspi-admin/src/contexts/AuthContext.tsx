import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthContextType, LoginRequest, UserInfo } from '../types';
import { authService } from '../services/authService';

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: UserInfo; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' }
  | { type: 'INITIALIZE'; payload: { user: UserInfo | null; token: string | null } };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!(action.payload.user && action.payload.token),
        isLoading: false,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Listen for auto-logout events from apiClient
  useEffect(() => {
    const handleAutoLogout = () => {
      dispatch({ type: 'LOGOUT' });
      // Redirect to login page
      window.location.href = '/login';
    };

    window.addEventListener('autoLogout', handleAutoLogout);

    return () => {
      window.removeEventListener('autoLogout', handleAutoLogout);
    };
  }, []);

  // Initialisation au démarrage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialiser le service d'auth
        authService.initializeAuth();

        const user = authService.getUser();
        const token = authService.getToken();

        if (user && token && authService.hasAdminRole(user)) {
          dispatch({
            type: 'INITIALIZE',
            payload: { user, token },
          });
        } else {
          // Nettoyer les données invalides
          await authService.logout();
          dispatch({
            type: 'INITIALIZE',
            payload: { user: null, token: null },
          });
        }
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        dispatch({
          type: 'INITIALIZE',
          payload: { user: null, token: null },
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });

      const response = await authService.login(credentials);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.accessToken,
        },
      });

      console.log('✅ Connexion réussie:', response.user.firstName);
    } catch (error: any) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Erreur de connexion',
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
      console.log('✅ Déconnexion réussie');

      // Rediriger vers la page de login
      window.location.href = '/login';
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      dispatch({ type: 'LOGOUT' });
      // Rediriger même en cas d'erreur
      window.location.href = '/login';
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const response = await authService.refreshToken();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.accessToken,
        },
      });
    } catch (error: any) {
      console.error('❌ Impossible de rafraîchir le token:', error);
      dispatch({ type: 'LOGOUT' });
      // Redirect to login page
      window.location.href = '/login';
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    refreshToken,
    error: state.error,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook pour vérifier les rôles
export const useRole = () => {
  const { user } = useAuth();

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role as any) || false;
  };

  const isSuperAdmin = (): boolean => {
    return hasRole('SUPER_ADMIN');
  };

  const isAdmin = (): boolean => {
    return hasRole('SUPER_ADMIN') || hasRole('ADMIN_SHOP');
  };

  return {
    hasRole,
    isSuperAdmin,
    isAdmin,
    roles: user?.roles || [],
  };
};