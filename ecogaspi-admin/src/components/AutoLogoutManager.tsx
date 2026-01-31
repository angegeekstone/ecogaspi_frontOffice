import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { idleTimer } from '../utils/idleTimer';

/**
 * Custom component to handle automatic logout after inactivity
 * Token refresh is now handled automatically by the apiClient interceptor
 */
export const AutoLogoutManager: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Stop the idle timer when not authenticated
      idleTimer.stop();
      return;
    }

    // Start the idle timer when authenticated
    idleTimer.start(() => {
      console.log('⏰ Automatic logout triggered due to inactivity');
      logout();
    });

    // Cleanup function
    return () => {
      idleTimer.stop();
    };
  }, [isAuthenticated, logout]);

  return null; // This component doesn't render anything
};