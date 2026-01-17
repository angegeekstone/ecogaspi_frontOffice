import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';
import '../main_screen.dart';


class PostRegistrationHomeScreen extends StatelessWidget {
  const PostRegistrationHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bienvenue sur EcoGaspi'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppColors.textPrimary,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 40),
              
              // Icône de succès
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: AppColors.primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(50),
                ),
                child: Icon(
                  Icons.check_circle,
                  size: 60,
                  color: AppColors.primaryColor,
                ),
              ),
              
              const SizedBox(height: 32),
              
              const Text(
                'Inscription réussie !',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryColor,
                ),
              ),
              
              const SizedBox(height: 16),
              
              const Text(
                'Votre compte a été créé avec succès. Vous pouvez maintenant commencer à utiliser toutes les fonctionnalités d\'EcoGaspi Business.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: AppColors.textSecondary,
                ),
              ),
              
              const SizedBox(height: 40),
              
              // Options pour commencer
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surfaceColor,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.borderColor),
                ),
                child: Column(
                  children: [
                    _buildOptionCard(
                      icon: Icons.store,
                      title: 'Gérer mon commerce',
                      description: 'Mettre à jour les informations de votre commerce',
                      onTap: () {
                        // Navigation vers la gestion du commerce
                      },
                    ),
                    const SizedBox(height: 16),
                    _buildOptionCard(
                      icon: Icons.inventory,
                      title: 'Ajouter des produits',
                      description: 'Commencer à lister vos produits en stock',
                      onTap: () {
                        // Navigation vers l'ajout de produits
                      },
                    ),
                    const SizedBox(height: 16),
                    _buildOptionCard(
                      icon: Icons.chat_bubble,
                      title: 'Messages',
                      description: 'Voir les demandes des clients',
                      onTap: () {
                        // Navigation vers les messages
                      },
                    ),
                  ],
                ),
              ),
              
              const Spacer(),
              
              // Bouton pour continuer vers l'application
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    // Rediriger vers l'écran principal de l'application
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (context) => const MainScreen()),
                      (route) => false,
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryColor,
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text(
                    'Commencer à utiliser EcoGaspi',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOptionCard({
    required IconData icon,
    required String title,
    required String description,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.borderColor),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: AppColors.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                icon,
                color: AppColors.primaryColor,
                size: 24,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: AppColors.textSecondary,
            ),
          ],
        ),
      ),
    );
  }
}