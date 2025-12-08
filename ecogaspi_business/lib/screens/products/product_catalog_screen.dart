import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';
import '../../widgets/product_card.dart';
import 'add_product_screen.dart';

class ProductCatalogScreen extends StatefulWidget {
  const ProductCatalogScreen({super.key});

  @override
  State<ProductCatalogScreen> createState() => _ProductCatalogScreenState();
}

class _ProductCatalogScreenState extends State<ProductCatalogScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: const Text(
          'Mes Produits',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.search,
              color: AppColors.textSecondary,
            ),
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.filter_list,
              color: AppColors.textSecondary,
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primaryColor,
          labelColor: AppColors.primaryColor,
          unselectedLabelColor: AppColors.textSecondary,
          labelStyle: const TextStyle(fontWeight: FontWeight.w600),
          tabs: const [
            Tab(text: 'Actifs (24)'),
            Tab(text: 'Archivés (12)'),
            Tab(text: 'Brouillons (3)'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildActiveProducts(),
          _buildArchivedProducts(),
          _buildDrafts(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddProductScreen(),
            ),
          );
        },
        backgroundColor: AppColors.primaryColor,
        foregroundColor: Colors.white,
        label: const Text('Ajouter'),
        icon: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildActiveProducts() {
    final products = [
      {
        'name': 'Lot de yaourts Danone',
        'category': 'Produits laitiers',
        'quantity': '50 pots',
        'price': '25,000 FCFA',
        'expirationDays': 2,
        'views': 45,
        'status': 'critical', // critical, warning, normal
        'image': null,
      },
      {
        'name': 'Biscuits LU variés',
        'category': 'Biscuiterie',
        'quantity': '200 paquets',
        'price': '80,000 FCFA',
        'expirationDays': 7,
        'views': 23,
        'status': 'warning',
        'image': null,
      },
      {
        'name': 'Huile de palme 1L',
        'category': 'Huiles',
        'quantity': '30 bouteilles',
        'price': '45,000 FCFA',
        'expirationDays': 45,
        'views': 12,
        'status': 'normal',
        'image': null,
      },
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: products.length,
      itemBuilder: (context, index) {
        final product = products[index];
        return ProductCard(
          name: product['name'] as String,
          category: product['category'] as String,
          quantity: product['quantity'] as String,
          price: product['price'] as String,
          expirationDays: product['expirationDays'] as int,
          views: product['views'] as int,
          status: product['status'] as String,
          onTap: () {
            // Navigation vers détail produit
          },
          onEdit: () {
            // Navigation vers édition
          },
          onBoost: () {
            // Action boost
          },
        );
      },
    );
  }

  Widget _buildArchivedProducts() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.archive_outlined,
            size: 64,
            color: AppColors.textSecondary,
          ),
          SizedBox(height: 16),
          Text(
            'Produits archivés',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Les produits vendus ou expirés\napparaîtront ici',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDrafts() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.drafts_outlined,
            size: 64,
            color: AppColors.textSecondary,
          ),
          SizedBox(height: 16),
          Text(
            'Brouillons',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Vos produits non publiés\nsont enregistrés ici',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}