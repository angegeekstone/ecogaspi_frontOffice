import React from 'react';
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Commerçants actifs',
    value: '1,247',
    change: '+12%',
    changeType: 'increase',
    icon: UsersIcon,
  },
  {
    name: 'Produits en vente',
    value: '8,432',
    change: '+5%',
    changeType: 'increase',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Chiffre d\'affaires',
    value: '€89,420',
    change: '+18%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Signalements',
    value: '23',
    change: '-8%',
    changeType: 'decrease',
    icon: ExclamationTriangleIcon,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'merchant',
    title: 'Nouveau commerçant inscrit',
    description: 'Épicerie BioMarket - Dakar',
    time: 'Il y a 2 heures',
    status: 'pending',
  },
  {
    id: 2,
    type: 'product',
    title: 'Produit signalé',
    description: 'Yaourt Nestlé - Date limite dépassée',
    time: 'Il y a 4 heures',
    status: 'warning',
  },
  {
    id: 3,
    type: 'transaction',
    title: 'Vente réalisée',
    description: '50kg de riz - 45,000 FCFA',
    time: 'Il y a 6 heures',
    status: 'success',
  },
  {
    id: 4,
    type: 'verification',
    title: 'Vérification requise',
    description: 'Dépôt AlimentairePlus - RCCM manquant',
    time: 'Il y a 1 jour',
    status: 'pending',
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Vue d'ensemble de la plateforme ECOGASPI
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon
                  className="h-8 w-8 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {item.changeType === 'increase' ? (
                        <ArrowUpIcon
                          className="self-center flex-shrink-0 h-4 w-4 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="self-center flex-shrink-0 h-4 w-4 text-red-500"
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                      </span>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Activités récentes
            </h3>
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div
                        className={`relative px-1 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${
                          activity.status === 'success'
                            ? 'bg-green-500'
                            : activity.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                      >
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {activity.title}
                            </p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <div className="mt-0.5 text-sm text-gray-500">
                            <time>{activity.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Actions rapides
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">
                Vérifier les commerçants en attente
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                15 commerçants en attente de vérification
              </p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">
                Modérer les signalements
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                8 signalements à traiter
              </p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">
                Analyser les statistiques
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Voir les tendances de la semaine
              </p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">
                Gérer les contenus
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Mettre à jour les catégories et politiques
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};