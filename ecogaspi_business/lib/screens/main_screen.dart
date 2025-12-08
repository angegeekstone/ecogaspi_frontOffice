import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../constants/app_colors.dart';
import 'home/dashboard_screen.dart';
import 'products/product_catalog_screen.dart';
import 'messages/chat_list_screen.dart';
import 'notifications/notification_screen.dart';
import 'profile/profile_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(),
    const ProductCatalogScreen(),
    ChatListScreen(),
    const NotificationScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: const BorderRadius.vertical(
            top: Radius.circular(20),
          ),
          child: BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            currentIndex: _currentIndex,
            selectedItemColor: AppColors.primaryColor,
            unselectedItemColor: AppColors.textSecondary,
            backgroundColor: Colors.white,
            elevation: 0,
            selectedFontSize: 12,
            unselectedFontSize: 12,
            onTap: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            items: [
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  child: Icon(
                    _currentIndex == 0 ? Icons.dashboard : Icons.dashboard_outlined,
                    size: 24,
                  ),
                ),
                label: 'dashboard'.tr(),
              ),
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  child: Icon(
                    _currentIndex == 1 ? Icons.inventory : Icons.inventory_outlined,
                    size: 24,
                  ),
                ),
                label: 'products'.tr(),
              ),
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  child: Stack(
                    children: [
                      Icon(
                        _currentIndex == 2 ? Icons.chat_bubble : Icons.chat_bubble_outline,
                        size: 24,
                      ),
                      // Badge pour nouveaux messages
                      Positioned(
                        right: 0,
                        top: 0,
                        child: Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: AppColors.errorColor,
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                label: 'messages'.tr(),
              ),
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  child: Stack(
                    children: [
                      Icon(
                        _currentIndex == 3 ? Icons.notifications : Icons.notifications_outlined,
                        size: 24,
                      ),
                      // Badge pour notifications
                      Positioned(
                        right: 0,
                        top: 0,
                        child: Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: AppColors.errorColor,
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                label: 'notifications'.tr(),
              ),
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  child: Icon(
                    _currentIndex == 4 ? Icons.person : Icons.person_outline,
                    size: 24,
                  ),
                ),
                label: 'profile'.tr(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}