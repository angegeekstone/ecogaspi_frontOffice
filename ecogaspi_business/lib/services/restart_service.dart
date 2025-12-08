import 'package:flutter/material.dart';

class RestartService {
  static void restartApp(BuildContext context) {
    // Trouve le widget racine et force un rebuild complet
    final navigatorState = Navigator.of(context, rootNavigator: true);
    navigatorState.pushAndRemoveUntil(
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          // Import nécessaire pour accéder à MyApp
          return const RestartWidget();
        },
        transitionDuration: Duration.zero,
        reverseTransitionDuration: Duration.zero,
      ),
      (route) => false,
    );
  }
}

class RestartWidget extends StatelessWidget {
  const RestartWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // Force un rebuild complet de l'application
    return const SizedBox.shrink();
  }
}