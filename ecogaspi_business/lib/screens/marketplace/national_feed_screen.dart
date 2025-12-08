import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';

class NationalFeedScreen extends StatefulWidget {
  const NationalFeedScreen({super.key});

  @override
  State<NationalFeedScreen> createState() => _NationalFeedScreenState();
}

class _NationalFeedScreenState extends State<NationalFeedScreen> {
  String _selectedFilter = 'Toutes les villes';
  String _selectedCategory = 'Toutes catégories';

  final List<String> _cities = [
    'Toutes les villes',
    'Douala',
    'Yaoundé',
    'Bafoussam',
    'Bamenda',
    'Garoua',
    'Maroua',
    'Ngaoundéré',
  ];

  final List<String> _categories = [
    'Toutes catégories',
    'Produits laitiers',
    'Boulangerie',
    'Biscuiterie',
    'Boissons',
    'Conserves',
    'Fruits & Légumes',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: const Text(
          'Marketplace Nationale',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        foregroundColor: AppColors.textPrimary,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.search),
          ),
        ],
      ),
      body: Column(
        children: [
          // Filtres
          Container(
            color: Colors.white,
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        value: _selectedFilter,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: AppColors.surfaceColor,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        ),
                        items: _cities.map((city) {
                          return DropdownMenuItem(
                            value: city,
                            child: Text(
                              city,
                              style: const TextStyle(fontSize: 14),
                            ),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedFilter = value!;
                          });
                        },
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        value: _selectedCategory,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: AppColors.surfaceColor,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        ),
                        items: _categories.map((category) {
                          return DropdownMenuItem(
                            value: category,
                            child: Text(
                              category,
                              style: const TextStyle(fontSize: 14),
                            ),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            _selectedCategory = value!;
                          });
                        },
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _buildFilterChip('Expiration < 3j', true),
                      const SizedBox(width: 8),
                      _buildFilterChip('Prix décroissant', false),
                      const SizedBox(width: 8),
                      _buildFilterChip('Grossistes', false),
                      const SizedBox(width: 8),
                      _buildFilterChip('Lots/Palettes', false),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Liste des produits
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _mockProducts.length,
              itemBuilder: (context, index) {
                final product = _mockProducts[index];
                return _buildProductCard(product);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, bool isSelected) {
    return GestureDetector(
      onTap: () {
        setState(() {
          // Toggle filter
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryColor : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? AppColors.primaryColor : AppColors.borderColor,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: isSelected ? Colors.white : AppColors.textSecondary,
          ),
        ),
      ),
    );
  }

  Widget _buildProductCard(Map<String, dynamic> product) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header avec vendeur et localisation
          Row(
            children: [
              CircleAvatar(
                radius: 16,
                backgroundColor: AppColors.primaryColor.withValues(alpha: 0.1),
                child: Text(
                  product['sellerName'][0],
                  style: const TextStyle(
                    color: AppColors.primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product['sellerName'],
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    Row(
                      children: [
                        const Icon(
                          Icons.location_on_outlined,
                          size: 12,
                          color: AppColors.textSecondary,
                        ),
                        const SizedBox(width: 2),
                        Text(
                          product['location'],
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _getStatusColor(product['urgency']).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  product['urgency'],
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: _getStatusColor(product['urgency']),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Produit
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: AppColors.surfaceColor,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.shopping_bag_outlined,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product['name'],
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      product['category'],
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          product['quantity'],
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: AppColors.primaryColor,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          product['price'],
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 16),

          // Footer avec expiration et action
          Row(
            children: [
              Icon(
                Icons.schedule_outlined,
                size: 16,
                color: _getStatusColor(product['urgency']),
              ),
              const SizedBox(width: 4),
              Text(
                'Expire dans ${product['expirationDays']} jour${product['expirationDays'] > 1 ? 's' : ''}',
                style: TextStyle(
                  fontSize: 12,
                  color: _getStatusColor(product['urgency']),
                ),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () {
                  // Ouvrir conversation
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryColor,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  elevation: 0,
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.chat_bubble_outline, size: 16),
                    SizedBox(width: 4),
                    Text('Négocier'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(String urgency) {
    switch (urgency) {
      case 'Urgent':
        return AppColors.errorColor;
      case 'Bientôt':
        return const Color(0xFFFF8F00);
      default:
        return const Color(0xFF4CAF50);
    }
  }

  final List<Map<String, dynamic>> _mockProducts = [
    {
      'name': 'Lots yaourts Danone',
      'category': 'Produits laitiers',
      'quantity': '100 pots',
      'price': '45,000 FCFA',
      'expirationDays': 1,
      'urgency': 'Urgent',
      'sellerName': 'Supermarché Central',
      'location': 'Douala, Akwa',
    },
    {
      'name': 'Biscuits assortis LU',
      'category': 'Biscuiterie',
      'quantity': '5 cartons',
      'price': '120,000 FCFA',
      'expirationDays': 5,
      'urgency': 'Bientôt',
      'sellerName': 'Dépôt Alimentaire Nord',
      'location': 'Yaoundé, Centre',
    },
    {
      'name': 'Huile de palme rouge',
      'category': 'Huiles',
      'quantity': '2 palettes',
      'price': '850,000 FCFA',
      'expirationDays': 30,
      'urgency': 'Normal',
      'sellerName': 'Industrie Palmier CM',
      'location': 'Douala, Bassa',
    },
  ];
}