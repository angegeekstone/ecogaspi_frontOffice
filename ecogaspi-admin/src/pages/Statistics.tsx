import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { name: 'Jan', merchants: 65, products: 840, revenue: 2400 },
  { name: 'Fév', merchants: 59, products: 680, revenue: 2210 },
  { name: 'Mar', merchants: 80, products: 920, revenue: 2290 },
  { name: 'Avr', merchants: 81, products: 1000, revenue: 2000 },
  { name: 'Mai', merchants: 56, products: 780, revenue: 2181 },
  { name: 'Juin', merchants: 55, products: 850, revenue: 2500 },
  { name: 'Juil', merchants: 40, products: 920, revenue: 2100 },
  { name: 'Août', merchants: 71, products: 1100, revenue: 2800 },
  { name: 'Sep', merchants: 85, products: 1250, revenue: 3200 },
  { name: 'Oct', merchants: 95, products: 1400, revenue: 3500 },
  { name: 'Nov', merchants: 105, products: 1520, revenue: 3800 },
  { name: 'Déc', merchants: 120, products: 1680, revenue: 4200 },
];

const categoryData = [
  { name: 'Produits laitiers', value: 400, color: '#0088FE' },
  { name: 'Céréales', value: 300, color: '#00C49F' },
  { name: 'Fruits et légumes', value: 300, color: '#FFBB28' },
  { name: 'Biscuiterie', value: 200, color: '#FF8042' },
  { name: 'Autres', value: 150, color: '#8884d8' },
];

const regionData = [
  { region: 'Dakar', merchants: 450, products: 2850 },
  { region: 'Thiès', merchants: 280, products: 1680 },
  { region: 'Saint-Louis', merchants: 180, products: 920 },
  { region: 'Kaolack', merchants: 150, products: 780 },
  { region: 'Ziguinchor', merchants: 120, products: 650 },
];

export const Statistics: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Statistiques</h1>
        <p className="mt-2 text-sm text-gray-700">
          Analyse des performances de la plateforme ECOGASPI
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">1,247</div>
            <div className="text-sm text-gray-500">Commerçants actifs</div>
            <div className="text-xs text-green-600 mt-1">+12% ce mois</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8,432</div>
            <div className="text-sm text-gray-500">Produits en vente</div>
            <div className="text-xs text-green-600 mt-1">+5% ce mois</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">€89,420</div>
            <div className="text-sm text-gray-500">Chiffre d'affaires</div>
            <div className="text-xs text-green-600 mt-1">+18% ce mois</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">€8,942</div>
            <div className="text-sm text-gray-500">Commissions</div>
            <div className="text-xs text-green-600 mt-1">+15% ce mois</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Growth */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Évolution mensuelle
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="merchants"
                stroke="#8884d8"
                name="Commerçants"
              />
              <Line
                type="monotone"
                dataKey="products"
                stroke="#82ca9d"
                name="Produits"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Chiffre d'affaires mensuel (€)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Categories Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Répartition par catégorie
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Répartition par région
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" />
              <Tooltip />
              <Bar dataKey="merchants" fill="#8884d8" name="Commerçants" />
              <Bar dataKey="products" fill="#82ca9d" name="Produits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Categories */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top catégories ce mois
          </h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    #{index + 1} {category.name}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {category.value} produits
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Regions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top régions
          </h3>
          <div className="space-y-4">
            {regionData.map((region, index) => (
              <div key={region.region} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    #{index + 1} {region.region}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {region.merchants} commerçants, {region.products} produits
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="mt-8 card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Indicateurs de performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-gray-500">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2.3</div>
            <div className="text-sm text-gray-500">Jours moyen d'écoulement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-500">Produits écoulés</div>
          </div>
        </div>
      </div>
    </div>
  );
};