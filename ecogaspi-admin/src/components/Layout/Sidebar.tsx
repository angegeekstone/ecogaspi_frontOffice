import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CogIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useAuth, useRole } from '../../contexts/AuthContext';
import ConfirmationModal from '../ConfirmationModal';

const commonNavigation = [
  { name: 'Tableau de bord', href: '/', icon: HomeIcon },
  { name: 'Commerçants', href: '/merchants', icon: UsersIcon },
  { name: 'Produits', href: '/products', icon: ShoppingBagIcon },
  { name: 'Transactions', href: '/transactions', icon: CurrencyDollarIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Signalements', href: '/reports', icon: ExclamationTriangleIcon },
  { name: 'Statistiques', href: '/statistics', icon: ChartBarIcon },
];

const superAdminNavigation = [
  { name: 'Catégories entreprises', href: '/business-categories', icon: BuildingOffice2Icon },
  { name: 'Validation annonces', href: '/annonces-validation', icon: CheckBadgeIcon },
  { name: 'Contenus', href: '/content', icon: DocumentTextIcon },
  { name: 'Paramètres', href: '/settings', icon: CogIcon },
];

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { isSuperAdmin } = useRole();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      console.log('🔐 Déconnexion en cours...');
      await logout();
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getRoleDisplay = () => {
    if (isSuperAdmin()) return 'Super Admin';
    return 'Administrateur';
  };

  if (!user) return null;

  return (
    <div className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div className="inline-flex h-9 w-9 rounded-full bg-primary-600 items-center justify-center">
          {user.profileImageUrl ? (
            <img
              className="h-9 w-9 rounded-full"
              src={user.profileImageUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
          ) : (
            <span className="text-white font-medium text-sm">
              {getInitials(user.firstName, user.lastName)}
            </span>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">
            {user.firstName} {user.lastName}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-300">{getRoleDisplay()}</p>
            <button
              onClick={handleLogoutClick}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de déconnexion */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Confirmer la déconnexion"
        message={`Êtes-vous sûr de vouloir vous déconnecter ?\n\nVous serez redirigé vers la page de connexion.`}
        confirmText="Se déconnecter"
        cancelText="Annuler"
        isLoading={isLoggingOut}
        type="warning"
      />
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { isSuperAdmin } = useRole();

  const renderNavigation = (navItems: typeof commonNavigation, title?: string) => (
    <div>
      {title && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <item.icon
              className="mr-3 h-6 w-6 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-sidebar-bg pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">ECOGASPI Admin</h1>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-6">
            {renderNavigation(commonNavigation)}

            {isSuperAdmin() && (
              renderNavigation(superAdminNavigation)
            )}
          </nav>
        </div>

        <div className="flex-shrink-0 flex bg-sidebar-hover p-4">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};