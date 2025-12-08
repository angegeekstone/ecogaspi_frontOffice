import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard, Merchants, Products, Statistics, Login } from './pages';
import { env } from './config';

function App() {
  useEffect(() => {
    // Log environment info on app start
    if (env.debug) {
      env.logEnvironmentInfo();
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique de connexion */}
          <Route path="/login" element={<Login />} />

          {/* Routes protégées */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/merchants" element={<Merchants />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/transactions" element={<div className="p-8 text-center"><h2 className="text-xl">Transactions - En cours de développement</h2></div>} />
                    <Route path="/messages" element={<div className="p-8 text-center"><h2 className="text-xl">Messages - En cours de développement</h2></div>} />
                    <Route path="/reports" element={<div className="p-8 text-center"><h2 className="text-xl">Signalements - En cours de développement</h2></div>} />
                    <Route path="/statistics" element={<Statistics />} />

                    {/* Routes réservées aux Super Admins */}
                    <Route
                      path="/content"
                      element={
                        <ProtectedRoute requiredRole="SUPER_ADMIN">
                          <div className="p-8 text-center">
                            <h2 className="text-xl">Gestion de contenu - En cours de développement</h2>
                          </div>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute requiredRole="SUPER_ADMIN">
                          <div className="p-8 text-center">
                            <h2 className="text-xl">Paramètres - En cours de développement</h2>
                          </div>
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;