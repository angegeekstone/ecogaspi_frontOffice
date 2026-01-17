import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../constants/app_colors.dart';
import '../../models/business_model.dart';
import '../../models/user_model.dart';
import '../../services/storage_service.dart';
import 'post_registration_home_screen.dart';

class RegistrationSummaryScreen extends ConsumerStatefulWidget {
  const RegistrationSummaryScreen({super.key});

  @override
  ConsumerState<RegistrationSummaryScreen> createState() => _RegistrationSummaryScreenState();
}

class _RegistrationSummaryScreenState extends ConsumerState<RegistrationSummaryScreen> {
  User? user;
  Business? business;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    try {
      user = await StorageService.getUserData();
      business = await StorageService.getBusinessData();
    } catch (e) {
      print('Erreur lors du chargement des données: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Résumé de votre inscription'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppColors.textPrimary,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Félicitations !',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primaryColor,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Votre inscription a été effectuée avec succès',
                    style: TextStyle(
                      fontSize: 16,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 32),
                  
                  // Section Informations Personnelles
                  const Text(
                    'Informations Personnelles',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildInfoCard([
                    _buildInfoRow('Prénom:', user?.firstName ?? ''),
                    _buildInfoRow('Nom:', user?.lastName ?? ''),
                    _buildInfoRow('Email:', user?.email ?? ''),
                    _buildInfoRow('Téléphone:', user?.phoneNumber ?? ''),
                  ]),
                  
                  const SizedBox(height: 24),
                  
                  // Section Informations du Commerce
                  const Text(
                    'Informations du Commerce',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildInfoCard([
                    _buildInfoRow('Nom du commerce:', business?.businessName ?? ''),
                    _buildInfoRow('Description:', business?.description ?? ''),
                    _buildInfoRow('Adresse:', business?.address ?? ''),
                    _buildInfoRow('Ville:', business?.city ?? ''),
                    _buildInfoRow('Pays:', business?.country ?? ''),
                    _buildInfoRow('Numéro Wallet:', business?.walletNumber ?? ''),
                  ]),
                  
                  const SizedBox(height: 32),
                  
                  // Bouton Continuer
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton(
                      onPressed: () {
                        // Rediriger vers l'écran d'accueil personnalisé après inscription
                        Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(builder: (context) => const PostRegistrationHomeScreen()),
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
    );
  }

  Widget _buildInfoCard(List<Widget> children) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderColor),
      ),
      child: Column(
        children: children,
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                color: AppColors.textSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}