import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';
import 'app_localizations_fr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'gen_l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale) : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('en'),
    Locale('fr')
  ];

  /// The name of the application
  ///
  /// In en, this message translates to:
  /// **'EcoGaspi Business'**
  String get appName;

  /// The tagline of the application
  ///
  /// In en, this message translates to:
  /// **'Professional marketplace for clearance'**
  String get appTagline;

  /// No description provided for @welcome.
  ///
  /// In en, this message translates to:
  /// **'Welcome!'**
  String get welcome;

  /// No description provided for @welcomeBack.
  ///
  /// In en, this message translates to:
  /// **'Welcome back!'**
  String get welcomeBack;

  /// No description provided for @connectToBusinessAccount.
  ///
  /// In en, this message translates to:
  /// **'Sign in to your business account'**
  String get connectToBusinessAccount;

  /// No description provided for @joinEcoGaspiBusiness.
  ///
  /// In en, this message translates to:
  /// **'Join EcoGaspi Business'**
  String get joinEcoGaspiBusiness;

  /// No description provided for @sellStocksProfessionals.
  ///
  /// In en, this message translates to:
  /// **'Sell your stocks easily between professionals'**
  String get sellStocksProfessionals;

  /// No description provided for @alreadyHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Already have an account?'**
  String get alreadyHaveAccount;

  /// No description provided for @signIn.
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get signIn;

  /// No description provided for @signUp.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get signUp;

  /// No description provided for @createBusinessAccount.
  ///
  /// In en, this message translates to:
  /// **'Create business account'**
  String get createBusinessAccount;

  /// No description provided for @needHelp.
  ///
  /// In en, this message translates to:
  /// **'Need help?'**
  String get needHelp;

  /// No description provided for @contactEcoGaspiSupport.
  ///
  /// In en, this message translates to:
  /// **'Contact EcoGaspi Support'**
  String get contactEcoGaspiSupport;

  /// No description provided for @phoneNumber.
  ///
  /// In en, this message translates to:
  /// **'Phone Number'**
  String get phoneNumber;

  /// No description provided for @password.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get password;

  /// No description provided for @firstName.
  ///
  /// In en, this message translates to:
  /// **'First Name'**
  String get firstName;

  /// No description provided for @lastName.
  ///
  /// In en, this message translates to:
  /// **'Last Name'**
  String get lastName;

  /// No description provided for @businessName.
  ///
  /// In en, this message translates to:
  /// **'Business Name'**
  String get businessName;

  /// No description provided for @businessAddress.
  ///
  /// In en, this message translates to:
  /// **'Business Address'**
  String get businessAddress;

  /// No description provided for @walletNumber.
  ///
  /// In en, this message translates to:
  /// **'Wallet Number (Mobile Money)'**
  String get walletNumber;

  /// No description provided for @enterPassword.
  ///
  /// In en, this message translates to:
  /// **'Enter your password'**
  String get enterPassword;

  /// No description provided for @rememberMe.
  ///
  /// In en, this message translates to:
  /// **'Remember me'**
  String get rememberMe;

  /// No description provided for @forgotPassword.
  ///
  /// In en, this message translates to:
  /// **'Forgot password?'**
  String get forgotPassword;

  /// No description provided for @signInButton.
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get signInButton;

  /// No description provided for @continueButton.
  ///
  /// In en, this message translates to:
  /// **'Continue'**
  String get continueButton;

  /// No description provided for @fastMode.
  ///
  /// In en, this message translates to:
  /// **'Fast Mode'**
  String get fastMode;

  /// No description provided for @completeMode.
  ///
  /// In en, this message translates to:
  /// **'Complete Mode'**
  String get completeMode;

  /// No description provided for @additionalInfo.
  ///
  /// In en, this message translates to:
  /// **'Additional Information'**
  String get additionalInfo;

  /// No description provided for @rccmOptional.
  ///
  /// In en, this message translates to:
  /// **'RCCM (optional)'**
  String get rccmOptional;

  /// No description provided for @patenteOptional.
  ///
  /// In en, this message translates to:
  /// **'License (optional)'**
  String get patenteOptional;

  /// No description provided for @phoneNumberRequired.
  ///
  /// In en, this message translates to:
  /// **'Phone number is required'**
  String get phoneNumberRequired;

  /// No description provided for @passwordRequired.
  ///
  /// In en, this message translates to:
  /// **'Password is required'**
  String get passwordRequired;

  /// No description provided for @firstNameRequired.
  ///
  /// In en, this message translates to:
  /// **'First name is required'**
  String get firstNameRequired;

  /// No description provided for @lastNameRequired.
  ///
  /// In en, this message translates to:
  /// **'Last name is required'**
  String get lastNameRequired;

  /// No description provided for @businessNameRequired.
  ///
  /// In en, this message translates to:
  /// **'Business name is required'**
  String get businessNameRequired;

  /// No description provided for @addressRequired.
  ///
  /// In en, this message translates to:
  /// **'Address is required'**
  String get addressRequired;

  /// No description provided for @walletNumberRequired.
  ///
  /// In en, this message translates to:
  /// **'Wallet number is required'**
  String get walletNumberRequired;

  /// No description provided for @dashboard.
  ///
  /// In en, this message translates to:
  /// **'Dashboard'**
  String get dashboard;

  /// No description provided for @products.
  ///
  /// In en, this message translates to:
  /// **'Products'**
  String get products;

  /// No description provided for @messages.
  ///
  /// In en, this message translates to:
  /// **'Messages'**
  String get messages;

  /// No description provided for @notifications.
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notifications;

  /// No description provided for @profile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profile;

  /// No description provided for @hello.
  ///
  /// In en, this message translates to:
  /// **'Hello, {name}'**
  String hello(String name);

  /// No description provided for @urgentProductsExpiring.
  ///
  /// In en, this message translates to:
  /// **'{count} products expire in 2 days'**
  String urgentProductsExpiring(int count);

  /// No description provided for @yourPerformance.
  ///
  /// In en, this message translates to:
  /// **'Your Performance'**
  String get yourPerformance;

  /// No description provided for @activeProducts.
  ///
  /// In en, this message translates to:
  /// **'Active Products'**
  String get activeProducts;

  /// No description provided for @totalSales.
  ///
  /// In en, this message translates to:
  /// **'Total Sales'**
  String get totalSales;

  /// No description provided for @averageRating.
  ///
  /// In en, this message translates to:
  /// **'Average Rating'**
  String get averageRating;

  /// No description provided for @verifiedMerchant.
  ///
  /// In en, this message translates to:
  /// **'Verified Merchant'**
  String get verifiedMerchant;

  /// No description provided for @viewYourPerformance.
  ///
  /// In en, this message translates to:
  /// **'View your performance'**
  String get viewYourPerformance;

  /// No description provided for @manageYourTransactions.
  ///
  /// In en, this message translates to:
  /// **'Manage your transactions'**
  String get manageYourTransactions;

  /// No description provided for @viewCustomerReviews.
  ///
  /// In en, this message translates to:
  /// **'View customer reviews'**
  String get viewCustomerReviews;

  /// No description provided for @personalInformation.
  ///
  /// In en, this message translates to:
  /// **'Personal Information'**
  String get personalInformation;

  /// No description provided for @editYourProfile.
  ///
  /// In en, this message translates to:
  /// **'Edit your profile'**
  String get editYourProfile;

  /// No description provided for @businessInformation.
  ///
  /// In en, this message translates to:
  /// **'Business Information'**
  String get businessInformation;

  /// No description provided for @businessDetails.
  ///
  /// In en, this message translates to:
  /// **'RCCM, license, address...'**
  String get businessDetails;

  /// No description provided for @manageYourAlerts.
  ///
  /// In en, this message translates to:
  /// **'Manage your alerts'**
  String get manageYourAlerts;

  /// No description provided for @securitySettings.
  ///
  /// In en, this message translates to:
  /// **'Password, 2FA...'**
  String get securitySettings;

  /// No description provided for @faqAndGuides.
  ///
  /// In en, this message translates to:
  /// **'FAQ and guides'**
  String get faqAndGuides;

  /// No description provided for @weHelpYou.
  ///
  /// In en, this message translates to:
  /// **'Have a question? We help you'**
  String get weHelpYou;

  /// No description provided for @improveTogether.
  ///
  /// In en, this message translates to:
  /// **'Let\'s improve EcoGaspi together'**
  String get improveTogether;

  /// No description provided for @termsAndPrivacy.
  ///
  /// In en, this message translates to:
  /// **'Our terms and privacy policy'**
  String get termsAndPrivacy;

  /// No description provided for @confirmSignOut.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to sign out?'**
  String get confirmSignOut;

  /// No description provided for @salesThisMonth.
  ///
  /// In en, this message translates to:
  /// **'Sales this Month'**
  String get salesThisMonth;

  /// No description provided for @unreadMessages.
  ///
  /// In en, this message translates to:
  /// **'Unread Messages'**
  String get unreadMessages;

  /// No description provided for @monthlyRevenue.
  ///
  /// In en, this message translates to:
  /// **'Monthly Revenue'**
  String get monthlyRevenue;

  /// No description provided for @quickActions.
  ///
  /// In en, this message translates to:
  /// **'Quick Actions'**
  String get quickActions;

  /// No description provided for @publishProduct.
  ///
  /// In en, this message translates to:
  /// **'Publish Product'**
  String get publishProduct;

  /// No description provided for @inLessThan20Seconds.
  ///
  /// In en, this message translates to:
  /// **'In less than 20 seconds'**
  String get inLessThan20Seconds;

  /// No description provided for @marketplace.
  ///
  /// In en, this message translates to:
  /// **'Marketplace'**
  String get marketplace;

  /// No description provided for @seeOffers.
  ///
  /// In en, this message translates to:
  /// **'See offers'**
  String get seeOffers;

  /// No description provided for @recentActivity.
  ///
  /// In en, this message translates to:
  /// **'Recent Activity'**
  String get recentActivity;

  /// No description provided for @myProducts.
  ///
  /// In en, this message translates to:
  /// **'My Products'**
  String get myProducts;

  /// No description provided for @active.
  ///
  /// In en, this message translates to:
  /// **'Active ({count})'**
  String active(int count);

  /// No description provided for @archived.
  ///
  /// In en, this message translates to:
  /// **'Archived ({count})'**
  String archived(int count);

  /// No description provided for @drafts.
  ///
  /// In en, this message translates to:
  /// **'Drafts ({count})'**
  String drafts(int count);

  /// No description provided for @addProduct.
  ///
  /// In en, this message translates to:
  /// **'Add Product'**
  String get addProduct;

  /// No description provided for @publishProductTitle.
  ///
  /// In en, this message translates to:
  /// **'Publish a Product'**
  String get publishProductTitle;

  /// No description provided for @ultraFastPublication.
  ///
  /// In en, this message translates to:
  /// **'Ultra-fast publication'**
  String get ultraFastPublication;

  /// No description provided for @estimatedTime.
  ///
  /// In en, this message translates to:
  /// **'Estimated time: {seconds} seconds remaining'**
  String estimatedTime(int seconds);

  /// No description provided for @addPhoto.
  ///
  /// In en, this message translates to:
  /// **'Add photo\n(optional)'**
  String get addPhoto;

  /// No description provided for @productName.
  ///
  /// In en, this message translates to:
  /// **'Product Name *'**
  String get productName;

  /// No description provided for @category.
  ///
  /// In en, this message translates to:
  /// **'Category *'**
  String get category;

  /// No description provided for @quantity.
  ///
  /// In en, this message translates to:
  /// **'Quantity *'**
  String get quantity;

  /// No description provided for @unit.
  ///
  /// In en, this message translates to:
  /// **'Unit'**
  String get unit;

  /// No description provided for @totalPrice.
  ///
  /// In en, this message translates to:
  /// **'Total Price *'**
  String get totalPrice;

  /// No description provided for @expirationDate.
  ///
  /// In en, this message translates to:
  /// **'Expiration Date *'**
  String get expirationDate;

  /// No description provided for @selectDate.
  ///
  /// In en, this message translates to:
  /// **'Select date'**
  String get selectDate;

  /// No description provided for @automaticSuggestions.
  ///
  /// In en, this message translates to:
  /// **'Automatic Suggestions'**
  String get automaticSuggestions;

  /// No description provided for @preview.
  ///
  /// In en, this message translates to:
  /// **'Preview'**
  String get preview;

  /// No description provided for @publishNow.
  ///
  /// In en, this message translates to:
  /// **'Publish Now'**
  String get publishNow;

  /// No description provided for @nationalMarketplace.
  ///
  /// In en, this message translates to:
  /// **'National Marketplace'**
  String get nationalMarketplace;

  /// No description provided for @allCities.
  ///
  /// In en, this message translates to:
  /// **'All Cities'**
  String get allCities;

  /// No description provided for @allCategories.
  ///
  /// In en, this message translates to:
  /// **'All Categories'**
  String get allCategories;

  /// No description provided for @expiring3Days.
  ///
  /// In en, this message translates to:
  /// **'Expiring < 3d'**
  String get expiring3Days;

  /// No description provided for @priceDescending.
  ///
  /// In en, this message translates to:
  /// **'Price descending'**
  String get priceDescending;

  /// No description provided for @wholesalers.
  ///
  /// In en, this message translates to:
  /// **'Wholesalers'**
  String get wholesalers;

  /// No description provided for @lotsPackages.
  ///
  /// In en, this message translates to:
  /// **'Lots/Packages'**
  String get lotsPackages;

  /// No description provided for @urgent.
  ///
  /// In en, this message translates to:
  /// **'Urgent'**
  String get urgent;

  /// No description provided for @soon.
  ///
  /// In en, this message translates to:
  /// **'Soon'**
  String get soon;

  /// No description provided for @normal.
  ///
  /// In en, this message translates to:
  /// **'Normal'**
  String get normal;

  /// No description provided for @negotiate.
  ///
  /// In en, this message translates to:
  /// **'Negotiate'**
  String get negotiate;

  /// No description provided for @activeConversations.
  ///
  /// In en, this message translates to:
  /// **'{count} active conversations'**
  String activeConversations(int count);

  /// No description provided for @negotiationsInProgress.
  ///
  /// In en, this message translates to:
  /// **'{count} negotiations in progress'**
  String negotiationsInProgress(int count);

  /// No description provided for @typing.
  ///
  /// In en, this message translates to:
  /// **'Typing...'**
  String get typing;

  /// No description provided for @offer.
  ///
  /// In en, this message translates to:
  /// **'Offer'**
  String get offer;

  /// No description provided for @negotiation.
  ///
  /// In en, this message translates to:
  /// **'Negotiation'**
  String get negotiation;

  /// No description provided for @agreement.
  ///
  /// In en, this message translates to:
  /// **'Agreement'**
  String get agreement;

  /// No description provided for @alerts.
  ///
  /// In en, this message translates to:
  /// **'Alerts ({count})'**
  String alerts(int count);

  /// No description provided for @messagesTab.
  ///
  /// In en, this message translates to:
  /// **'Messages ({count})'**
  String messagesTab(int count);

  /// No description provided for @activity.
  ///
  /// In en, this message translates to:
  /// **'Activity ({count})'**
  String activity(int count);

  /// No description provided for @markAllAsRead.
  ///
  /// In en, this message translates to:
  /// **'Mark all as read'**
  String get markAllAsRead;

  /// No description provided for @productsSoonExpiring.
  ///
  /// In en, this message translates to:
  /// **'Products Soon Expiring'**
  String get productsSoonExpiring;

  /// No description provided for @productsExpireInDays.
  ///
  /// In en, this message translates to:
  /// **'{count} products expire in less than {days} days'**
  String productsExpireInDays(int count, int days);

  /// No description provided for @slowRotationDetected.
  ///
  /// In en, this message translates to:
  /// **'Slow Rotation Detected'**
  String get slowRotationDetected;

  /// No description provided for @boostSuggestion.
  ///
  /// In en, this message translates to:
  /// **'Boost Suggestion'**
  String get boostSuggestion;

  /// No description provided for @apply.
  ///
  /// In en, this message translates to:
  /// **'Apply'**
  String get apply;

  /// No description provided for @myBusiness.
  ///
  /// In en, this message translates to:
  /// **'My Business'**
  String get myBusiness;

  /// No description provided for @salesStatistics.
  ///
  /// In en, this message translates to:
  /// **'Sales Statistics'**
  String get salesStatistics;

  /// No description provided for @seeYourPerformance.
  ///
  /// In en, this message translates to:
  /// **'See your performance'**
  String get seeYourPerformance;

  /// No description provided for @walletPayments.
  ///
  /// In en, this message translates to:
  /// **'Wallet & Payments'**
  String get walletPayments;

  /// No description provided for @manageTransactions.
  ///
  /// In en, this message translates to:
  /// **'Manage your transactions'**
  String get manageTransactions;

  /// No description provided for @reviewsRatings.
  ///
  /// In en, this message translates to:
  /// **'Reviews & Ratings'**
  String get reviewsRatings;

  /// No description provided for @seeCustomerReviews.
  ///
  /// In en, this message translates to:
  /// **'See customer reviews'**
  String get seeCustomerReviews;

  /// No description provided for @settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// No description provided for @personalInfo.
  ///
  /// In en, this message translates to:
  /// **'Personal Information'**
  String get personalInfo;

  /// No description provided for @editProfile.
  ///
  /// In en, this message translates to:
  /// **'Edit your profile'**
  String get editProfile;

  /// No description provided for @businessInfo.
  ///
  /// In en, this message translates to:
  /// **'Business Information'**
  String get businessInfo;

  /// No description provided for @notificationSettings.
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notificationSettings;

  /// No description provided for @manageAlerts.
  ///
  /// In en, this message translates to:
  /// **'Manage your alerts'**
  String get manageAlerts;

  /// No description provided for @security.
  ///
  /// In en, this message translates to:
  /// **'Security'**
  String get security;

  /// No description provided for @passwordSecurity.
  ///
  /// In en, this message translates to:
  /// **'Password, 2FA...'**
  String get passwordSecurity;

  /// No description provided for @support.
  ///
  /// In en, this message translates to:
  /// **'Support'**
  String get support;

  /// No description provided for @helpCenter.
  ///
  /// In en, this message translates to:
  /// **'Help Center'**
  String get helpCenter;

  /// No description provided for @faqGuides.
  ///
  /// In en, this message translates to:
  /// **'FAQ and guides'**
  String get faqGuides;

  /// No description provided for @contactSupport.
  ///
  /// In en, this message translates to:
  /// **'Contact Support'**
  String get contactSupport;

  /// No description provided for @questionWeHelp.
  ///
  /// In en, this message translates to:
  /// **'Have a question? We help you'**
  String get questionWeHelp;

  /// No description provided for @giveFeedback.
  ///
  /// In en, this message translates to:
  /// **'Give Feedback'**
  String get giveFeedback;

  /// No description provided for @improveEcoGaspi.
  ///
  /// In en, this message translates to:
  /// **'Let\'s improve EcoGaspi together'**
  String get improveEcoGaspi;

  /// No description provided for @application.
  ///
  /// In en, this message translates to:
  /// **'Application'**
  String get application;

  /// No description provided for @about.
  ///
  /// In en, this message translates to:
  /// **'About'**
  String get about;

  /// No description provided for @version.
  ///
  /// In en, this message translates to:
  /// **'Version 1.0.0'**
  String get version;

  /// No description provided for @termsOfService.
  ///
  /// In en, this message translates to:
  /// **'Terms of Service'**
  String get termsOfService;

  /// No description provided for @signOut.
  ///
  /// In en, this message translates to:
  /// **'Sign Out'**
  String get signOut;

  /// No description provided for @signOutConfirm.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to sign out?'**
  String get signOutConfirm;

  /// No description provided for @cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @chooseLanguage.
  ///
  /// In en, this message translates to:
  /// **'Choose Language'**
  String get chooseLanguage;

  /// No description provided for @french.
  ///
  /// In en, this message translates to:
  /// **'Français'**
  String get french;

  /// No description provided for @arabic.
  ///
  /// In en, this message translates to:
  /// **'العربية'**
  String get arabic;

  /// No description provided for @languageChanged.
  ///
  /// In en, this message translates to:
  /// **'Language changed successfully'**
  String get languageChanged;

  /// No description provided for @clearanceStocks.
  ///
  /// In en, this message translates to:
  /// **'Clear your stocks'**
  String get clearanceStocks;

  /// No description provided for @shortDLCProducts.
  ///
  /// In en, this message translates to:
  /// **'Short DLC or slow rotation products'**
  String get shortDLCProducts;

  /// No description provided for @nationalVisibility.
  ///
  /// In en, this message translates to:
  /// **'National visibility'**
  String get nationalVisibility;

  /// No description provided for @sellEverywhereInCameroon.
  ///
  /// In en, this message translates to:
  /// **'Sell everywhere in Cameroon'**
  String get sellEverywhereInCameroon;

  /// No description provided for @directNegotiation.
  ///
  /// In en, this message translates to:
  /// **'Direct negotiation'**
  String get directNegotiation;

  /// No description provided for @integratedB2BMessaging.
  ///
  /// In en, this message translates to:
  /// **'Integrated B2B messaging'**
  String get integratedB2BMessaging;

  /// No description provided for @published.
  ///
  /// In en, this message translates to:
  /// **'Published!'**
  String get published;

  /// No description provided for @productPublishedSuccess.
  ///
  /// In en, this message translates to:
  /// **'Your product is now visible on the marketplace. You will receive a notification as soon as a buyer is interested.'**
  String get productPublishedSuccess;

  /// No description provided for @perfect.
  ///
  /// In en, this message translates to:
  /// **'Perfect!'**
  String get perfect;

  /// No description provided for @codeSent.
  ///
  /// In en, this message translates to:
  /// **'Code sent!'**
  String get codeSent;

  /// No description provided for @resetCodeSentMessage.
  ///
  /// In en, this message translates to:
  /// **'A reset code has been sent to your phone number. Check your SMS.'**
  String get resetCodeSentMessage;

  /// No description provided for @understood.
  ///
  /// In en, this message translates to:
  /// **'Understood'**
  String get understood;

  /// No description provided for @fastBiometricLogin.
  ///
  /// In en, this message translates to:
  /// **'Fast biometric login'**
  String get fastBiometricLogin;

  /// No description provided for @or.
  ///
  /// In en, this message translates to:
  /// **'OR'**
  String get or;

  /// No description provided for @views.
  ///
  /// In en, this message translates to:
  /// **'{count} views'**
  String views(int count);

  /// No description provided for @expiresInDays.
  ///
  /// In en, this message translates to:
  /// **'Expires in {count} day(s)'**
  String expiresInDays(int count);

  /// No description provided for @fruitsVegetables.
  ///
  /// In en, this message translates to:
  /// **'Fruits & Vegetables'**
  String get fruitsVegetables;

  /// No description provided for @dairy.
  ///
  /// In en, this message translates to:
  /// **'Dairy Products'**
  String get dairy;

  /// No description provided for @meatFish.
  ///
  /// In en, this message translates to:
  /// **'Meat & Fish'**
  String get meatFish;

  /// No description provided for @bakery.
  ///
  /// In en, this message translates to:
  /// **'Bakery'**
  String get bakery;

  /// No description provided for @beverages.
  ///
  /// In en, this message translates to:
  /// **'Beverages'**
  String get beverages;

  /// No description provided for @processedFoods.
  ///
  /// In en, this message translates to:
  /// **'Processed Foods'**
  String get processedFoods;

  /// No description provided for @spicesCondiments.
  ///
  /// In en, this message translates to:
  /// **'Spices & Condiments'**
  String get spicesCondiments;

  /// No description provided for @frozenFoods.
  ///
  /// In en, this message translates to:
  /// **'Frozen Foods'**
  String get frozenFoods;

  /// No description provided for @statusPending.
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get statusPending;

  /// No description provided for @statusConfirmed.
  ///
  /// In en, this message translates to:
  /// **'Confirmed'**
  String get statusConfirmed;

  /// No description provided for @statusShipped.
  ///
  /// In en, this message translates to:
  /// **'Shipped'**
  String get statusShipped;

  /// No description provided for @statusDelivered.
  ///
  /// In en, this message translates to:
  /// **'Delivered'**
  String get statusDelivered;

  /// No description provided for @statusCancelled.
  ///
  /// In en, this message translates to:
  /// **'Cancelled'**
  String get statusCancelled;

  /// No description provided for @unitKg.
  ///
  /// In en, this message translates to:
  /// **'kg'**
  String get unitKg;

  /// No description provided for @unitG.
  ///
  /// In en, this message translates to:
  /// **'g'**
  String get unitG;

  /// No description provided for @unitL.
  ///
  /// In en, this message translates to:
  /// **'L'**
  String get unitL;

  /// No description provided for @unitMl.
  ///
  /// In en, this message translates to:
  /// **'mL'**
  String get unitMl;

  /// No description provided for @unitPiece.
  ///
  /// In en, this message translates to:
  /// **'piece'**
  String get unitPiece;

  /// No description provided for @unitBox.
  ///
  /// In en, this message translates to:
  /// **'box'**
  String get unitBox;

  /// No description provided for @unitPack.
  ///
  /// In en, this message translates to:
  /// **'pack'**
  String get unitPack;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>['ar', 'en', 'fr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {


  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar': return AppLocalizationsAr();
    case 'en': return AppLocalizationsEn();
    case 'fr': return AppLocalizationsFr();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.'
  );
}
