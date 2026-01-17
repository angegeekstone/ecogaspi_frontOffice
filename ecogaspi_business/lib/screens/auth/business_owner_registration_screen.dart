import 'package:ecogaspi_business/screens/auth/registration_summary_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../constants/app_colors.dart';
import '../../providers/registration_provider.dart';
import '../main_screen.dart';
import 'login_screen.dart';
import 'registration_summary_screen.dart';

class BusinessOwnerRegistrationScreen extends StatefulWidget {
  const BusinessOwnerRegistrationScreen({super.key});

  @override
  State<BusinessOwnerRegistrationScreen> createState() => _BusinessOwnerRegistrationScreenState();
}

class _BusinessOwnerRegistrationScreenState extends State<BusinessOwnerRegistrationScreen> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inscription Propriétaire de Commerce'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppColors.textPrimary,
      ),
      body: Consumer(
        builder: (context, ref, child) {
          final registrationState = ref.watch(registrationControllerProvider);
          final registrationController = ref.read(registrationControllerProvider.notifier);

          // Afficher un indicateur de chargement si nécessaire
          if (registrationState.status == RegistrationStatus.loading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Devenez partenaire EcoGaspi Business',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Inscrivez votre commerce et commencez à vendre vos stocks entre professionnels',
                    style: TextStyle(
                      fontSize: 16,
                      color: AppColors.textSecondary,
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Informations personnelles
                  const Text(
                    'Informations Personnelles',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Prénom
                  TextFormField(
                    onChanged: (value) => registrationController.updateFirstName(value),
                    decoration: InputDecoration(
                      labelText: 'Prénom *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le prénom est requis';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Nom de famille
                  TextFormField(
                    onChanged: (value) => registrationController.updateLastName(value),
                    decoration: InputDecoration(
                      labelText: 'Nom *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le nom est requis';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Email
                  TextFormField(
                    onChanged: (value) => registrationController.updateEmail(value),
                    decoration: InputDecoration(
                      labelText: 'Email *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'L\'email est requis';
                      }
                      if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
                        return 'Veuillez entrer un email valide';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Numéro de téléphone
                  TextFormField(
                    onChanged: (value) => registrationController.updatePhoneNumber(value),
                    decoration: InputDecoration(
                      labelText: 'Numéro de téléphone *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    keyboardType: TextInputType.phone,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le numéro de téléphone est requis';
                      }
                      if (value.length < 8) {
                        return 'Le numéro doit contenir au moins 8 chiffres';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Mot de passe
                  TextFormField(
                    onChanged: (value) => registrationController.updatePassword(value),
                    decoration: InputDecoration(
                      labelText: 'Mot de passe *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le mot de passe est requis';
                      }
                      if (value.length < 6) {
                        return 'Le mot de passe doit contenir au moins 6 caractères';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Confirmation du mot de passe
                  TextFormField(
                    onChanged: (value) => registrationController.updateConfirmPassword(value),
                    decoration: InputDecoration(
                      labelText: 'Confirmer le mot de passe *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Veuillez confirmer le mot de passe';
                      }
                      if (value != registrationState.password) {
                        return 'Les mots de passe ne correspondent pas';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 32),

                  // Informations sur le commerce
                  const Text(
                    'Informations sur le Commerce',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Nom du commerce
                  TextFormField(
                    onChanged: (value) => registrationController.updateBusinessName(value),
                    decoration: InputDecoration(
                      labelText: 'Nom du commerce *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le nom du commerce est requis';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Description du commerce
                  TextFormField(
                    onChanged: (value) => registrationController.updateDescription(value),
                    decoration: InputDecoration(
                      labelText: 'Description du commerce *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    maxLines: 3,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'La description est requise';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Catégorie du commerce
                  DropdownButtonFormField<int>(
                    value: registrationState.categoryId,
                    decoration: InputDecoration(
                      labelText: 'Catégorie du commerce *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    ),
                    items: const [
                      DropdownMenuItem(value: 1, child: Text('Boutique')),
                      DropdownMenuItem(value: 2, child: Text('Dépôt')),
                      DropdownMenuItem(value: 3, child: Text('Grossiste')),
                      DropdownMenuItem(value: 4, child: Text('Industriel')),
                    ],
                    onChanged: (value) {
                      if (value != null) {
                        registrationController.updateCategoryId(value);
                      }
                    },
                    validator: (value) {
                      if (value == null) {
                        return 'La catégorie est requise';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Adresse du commerce
                  TextFormField(
                    onChanged: (value) => registrationController.updateAddress(value),
                    decoration: InputDecoration(
                      labelText: 'Adresse du commerce *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    maxLines: 2,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'L\'adresse est requise';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Ville
                  TextFormField(
                    onChanged: (value) => registrationController.updateCity(value),
                    decoration: InputDecoration(
                      labelText: 'Ville *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'La ville est requise';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 16),

                  // Numéro de portefeuille
                  TextFormField(
                    onChanged: (value) => registrationController.updateWalletNumber(value),
                    decoration: InputDecoration(
                      labelText: 'Numéro Wallet (Mobile Money) *',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    keyboardType: TextInputType.phone,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Le numéro wallet est requis';
                      }
                      return null;
                    },
                  ),

                  const SizedBox(height: 32),

                  // Informations complémentaires (documents)
                  const Text(
                    'Documents (optionnels)',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updateRccm(value),
                    decoration: InputDecoration(
                      labelText: 'RCCM',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updatePatente(value),
                    decoration: InputDecoration(
                      labelText: 'Patente',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updateWebsite(value),
                    decoration: InputDecoration(
                      labelText: 'Site web',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updateLogoUrl(value),
                    decoration: InputDecoration(
                      labelText: 'URL du logo',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updateBusinessImageUrl(value),
                    decoration: InputDecoration(
                      labelText: 'URL de l\'image du commerce',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 16),

                  TextFormField(
                    onChanged: (value) => registrationController.updateMerchantCard(value),
                    decoration: InputDecoration(
                      labelText: 'Carte marchand',
                      filled: true,
                      fillColor: AppColors.surfaceColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: AppColors.primaryColor, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Message d'erreur
                  if (registrationState.errorMessage.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.errorColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.errorColor),
                      ),
                      child: Text(
                        registrationState.errorMessage,
                        style: TextStyle(
                          color: AppColors.errorColor,
                          fontSize: 14,
                        ),
                      ),
                    ),

                  const SizedBox(height: 24),

                  // Bouton d'inscription
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          final response = await registrationController.registerBusinessOwner();

                          if (response != null && response.success) {
                            // Redirection vers l'écran de résumé après inscription réussie
                            Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const RegistrationSummaryScreen(),
                              ),
                              (route) => false,
                            );
                          }
                        }
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
                        'S\'inscrire',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Lien vers connexion
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Vous avez déjà un compte ? ',
                        style: TextStyle(
                          color: AppColors.textSecondary,
                        ),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context); // Retour au welcome
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const LoginScreen(),
                            ),
                          );
                        },
                        child: const Text(
                          'Se connecter',
                          style: TextStyle(
                            color: AppColors.primaryColor,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}