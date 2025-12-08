import React from 'react';
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
} from '@heroicons/react/24/outline';
import { useAuth, useRole } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: HomeIcon },
  { name: 'Commerçants', href: '/merchants', icon: UsersIcon },
  { name: 'Produits', href: '/products', icon: ShoppingBagIcon },
  { name: 'Transactions', href: '/transactions', icon: CurrencyDollarIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Signalements', href: '/reports', icon: ExclamationTriangleIcon },
  { name: 'Statistiques', href: '/statistics', icon: ChartBarIcon },
  { name: 'Contenus', href: '/content', icon: DocumentTextIcon },
  { name: 'Paramètres', href: '/settings', icon: CogIcon },
];

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { isSuperAdmin } = useRole();

  const handleLogout = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      await logout();
    }
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
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-sidebar-bg pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">ECOGASPI Admin</h1>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
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
          </nav>
        </div>

        <div className="flex-shrink-0 flex bg-sidebar-hover p-4">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};