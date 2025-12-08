// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Arabic (`ar`).
class AppLocalizationsAr extends AppLocalizations {
  AppLocalizationsAr([String locale = 'ar']) : super(locale);

  @override
  String get appName => 'إيكوغاسبي بيزنس';

  @override
  String get appTagline => 'السوق المهنية للتصفية';

  @override
  String get welcome => 'مرحباً!';

  @override
  String get welcomeBack => 'مرحباً بعودتك!';

  @override
  String get connectToBusinessAccount => 'تسجيل الدخول إلى حساب العمل الخاص بك';

  @override
  String get joinEcoGaspiBusiness => 'انضم إلى إيكوغاسبي بيزنس';

  @override
  String get sellStocksProfessionals => 'بيع مخزونك بسهولة بين المهنيين';

  @override
  String get alreadyHaveAccount => 'هل تمتلك حساباً بالفعل؟';

  @override
  String get signIn => 'تسجيل الدخول';

  @override
  String get signUp => 'التسجيل';

  @override
  String get createBusinessAccount => 'إنشاء حساب تجاري';

  @override
  String get needHelp => 'تحتاج مساعدة؟';

  @override
  String get contactEcoGaspiSupport => 'اتصل بدعم إيكوغاسبي';

  @override
  String get phoneNumber => 'رقم الهاتف';

  @override
  String get password => 'كلمة المرور';

  @override
  String get firstName => 'الاسم الأول';

  @override
  String get lastName => 'الاسم الأخير';

  @override
  String get businessName => 'اسم التجارة';

  @override
  String get businessAddress => 'عنوان المحل';

  @override
  String get walletNumber => 'رقم المحفظة (الأموال المحمولة)';

  @override
  String get enterPassword => 'أدخل كلمة المرور';

  @override
  String get rememberMe => 'تذكرني';

  @override
  String get forgotPassword => 'نسيت كلمة المرور؟';

  @override
  String get signInButton => 'تسجيل الدخول';

  @override
  String get continueButton => 'متابعة';

  @override
  String get fastMode => 'الوضع السريع';

  @override
  String get completeMode => 'الوضع الكامل';

  @override
  String get additionalInfo => 'معلومات إضافية';

  @override
  String get rccmOptional => 'RCCM (اختياري)';

  @override
  String get patenteOptional => 'الترخيص (اختياري)';

  @override
  String get phoneNumberRequired => 'رقم الهاتف مطلوب';

  @override
  String get passwordRequired => 'كلمة المرور مطلوبة';

  @override
  String get firstNameRequired => 'الاسم الأول مطلوب';

  @override
  String get lastNameRequired => 'الاسم الأخير مطلوب';

  @override
  String get businessNameRequired => 'اسم التجارة مطلوب';

  @override
  String get addressRequired => 'العنوان مطلوب';

  @override
  String get walletNumberRequired => 'رقم المحفظة مطلوب';

  @override
  String get dashboard => 'لوحة التحكم';

  @override
  String get products => 'المنتجات';

  @override
  String get messages => 'الرسائل';

  @override
  String get notifications => 'الإشعارات';

  @override
  String get profile => 'الملف الشخصي';

  @override
  String hello(String name) {
    return 'مرحباً، $name';
  }

  @override
  String urgentProductsExpiring(int count) {
    return '$count منتجات تنتهي صلاحيتها خلال يومين';
  }

  @override
  String get yourPerformance => 'أداؤك';

  @override
  String get activeProducts => 'المنتجات النشطة';

  @override
  String get totalSales => 'إجمالي المبيعات';

  @override
  String get averageRating => 'التقييم المتوسط';

  @override
  String get verifiedMerchant => 'تاجر معتمد';

  @override
  String get viewYourPerformance => 'عرض أداؤك';

  @override
  String get manageYourTransactions => 'إدارة معاملاتك';

  @override
  String get viewCustomerReviews => 'عرض مراجعات العملاء';

  @override
  String get personalInformation => 'المعلومات الشخصية';

  @override
  String get editYourProfile => 'تعديل ملفك الشخصي';

  @override
  String get businessInformation => 'معلومات العمل';

  @override
  String get businessDetails => 'RCCM، الترخيص، العنوان...';

  @override
  String get manageYourAlerts => 'إدارة تنبيهاتك';

  @override
  String get securitySettings => 'كلمة المرور، 2FA...';

  @override
  String get faqAndGuides => 'الأسئلة الشائعة والأدلة';

  @override
  String get weHelpYou => 'لديك سؤال؟ نحن نساعدك';

  @override
  String get improveTogether => 'لنطور EcoGaspi معاً';

  @override
  String get termsAndPrivacy => 'شروطنا وسياسة الخصوصية';

  @override
  String get confirmSignOut => 'هل أنت متأكد من رغبتك في تسجيل الخروج؟';

  @override
  String get salesThisMonth => 'مبيعات هذا الشهر';

  @override
  String get unreadMessages => 'الرسائل غير المقروءة';

  @override
  String get monthlyRevenue => 'إيرادات الشهر';

  @override
  String get quickActions => 'إجراءات سريعة';

  @override
  String get publishProduct => 'نشر منتج';

  @override
  String get inLessThan20Seconds => 'في أقل من 20 ثانية';

  @override
  String get marketplace => 'السوق';

  @override
  String get seeOffers => 'عرض العروض';

  @override
  String get recentActivity => 'النشاط الأخير';

  @override
  String get myProducts => 'منتجاتي';

  @override
  String active(int count) {
    return 'نشط ($count)';
  }

  @override
  String archived(int count) {
    return 'مؤرشف ($count)';
  }

  @override
  String drafts(int count) {
    return 'مسودات ($count)';
  }

  @override
  String get addProduct => 'إضافة';

  @override
  String get publishProductTitle => 'نشر منتج';

  @override
  String get ultraFastPublication => 'نشر فائق السرعة';

  @override
  String estimatedTime(int seconds) {
    return 'الوقت المقدر: $seconds ثانية متبقية';
  }

  @override
  String get addPhoto => 'إضافة صورة\n(اختياري)';

  @override
  String get productName => 'اسم المنتج *';

  @override
  String get category => 'الفئة *';

  @override
  String get quantity => 'الكمية *';

  @override
  String get unit => 'الوحدة';

  @override
  String get totalPrice => 'السعر الإجمالي *';

  @override
  String get expirationDate => 'تاريخ انتهاء الصلاحية *';

  @override
  String get selectDate => 'اختر التاريخ';

  @override
  String get automaticSuggestions => 'اقتراحات تلقائية';

  @override
  String get preview => 'معاينة';

  @override
  String get publishNow => 'انشر الآن';

  @override
  String get nationalMarketplace => 'السوق الوطنية';

  @override
  String get allCities => 'جميع المدن';

  @override
  String get allCategories => 'جميع الفئات';

  @override
  String get expiring3Days => 'تنتهي < 3 أيام';

  @override
  String get priceDescending => 'السعر تنازلي';

  @override
  String get wholesalers => 'تجار الجملة';

  @override
  String get lotsPackages => 'مجموعات/عبوات';

  @override
  String get urgent => 'عاجل';

  @override
  String get soon => 'قريباً';

  @override
  String get normal => 'عادي';

  @override
  String get negotiate => 'تفاوض';

  @override
  String activeConversations(int count) {
    return '$count محادثات نشطة';
  }

  @override
  String negotiationsInProgress(int count) {
    return '$count مفاوضات جارية';
  }

  @override
  String get typing => 'يكتب...';

  @override
  String get offer => 'عرض';

  @override
  String get negotiation => 'تفاوض';

  @override
  String get agreement => 'اتفاق';

  @override
  String alerts(int count) {
    return 'التنبيهات ($count)';
  }

  @override
  String messagesTab(int count) {
    return 'الرسائل ($count)';
  }

  @override
  String activity(int count) {
    return 'النشاط ($count)';
  }

  @override
  String get markAllAsRead => 'قراءة الكل';

  @override
  String get productsSoonExpiring => 'منتجات قريبة الانتهاء';

  @override
  String productsExpireInDays(int count, int days) {
    return '$count منتجات تنتهي في أقل من $days أيام';
  }

  @override
  String get slowRotationDetected => 'تم اكتشاف دوران بطيء';

  @override
  String get boostSuggestion => 'اقتراح دفع';

  @override
  String get apply => 'تطبيق';

  @override
  String get myBusiness => 'عملي';

  @override
  String get salesStatistics => 'إحصائيات المبيعات';

  @override
  String get seeYourPerformance => 'عرض أداؤك';

  @override
  String get walletPayments => 'المحفظة والدفعات';

  @override
  String get manageTransactions => 'إدارة معاملاتك';

  @override
  String get reviewsRatings => 'التقييمات والمراجعات';

  @override
  String get seeCustomerReviews => 'عرض مراجعات العملاء';

  @override
  String get settings => 'الإعدادات';

  @override
  String get personalInfo => 'المعلومات الشخصية';

  @override
  String get editProfile => 'تحرير ملفك الشخصي';

  @override
  String get businessInfo => 'معلومات العمل';

  @override
  String get notificationSettings => 'الإشعارات';

  @override
  String get manageAlerts => 'إدارة تنبيهاتك';

  @override
  String get security => 'الأمان';

  @override
  String get passwordSecurity => 'كلمة المرور، 2FA...';

  @override
  String get support => 'الدعم';

  @override
  String get helpCenter => 'مركز المساعدة';

  @override
  String get faqGuides => 'الأسئلة الشائعة والأدلة';

  @override
  String get contactSupport => 'اتصل بالدعم';

  @override
  String get questionWeHelp => 'لديك سؤال؟ نحن نساعدك';

  @override
  String get giveFeedback => 'قدم ملاحظاتك';

  @override
  String get improveEcoGaspi => 'لنحسن إيكوغاسبي معاً';

  @override
  String get application => 'التطبيق';

  @override
  String get about => 'حول';

  @override
  String get version => 'الإصدار 1.0.0';

  @override
  String get termsOfService => 'شروط الخدمة';

  @override
  String get signOut => 'تسجيل الخروج';

  @override
  String get signOutConfirm => 'هل أنت متأكد أنك تريد تسجيل الخروج؟';

  @override
  String get cancel => 'إلغاء';

  @override
  String get language => 'اللغة';

  @override
  String get chooseLanguage => 'اختر اللغة';

  @override
  String get french => 'Français';

  @override
  String get arabic => 'العربية';

  @override
  String get languageChanged => 'تم تغيير اللغة بنجاح';

  @override
  String get clearanceStocks => 'أوضح مخزونك';

  @override
  String get shortDLCProducts => 'منتجات قصيرة المدى أو بطيئة التنقل';

  @override
  String get nationalVisibility => 'رؤية وطنية';

  @override
  String get sellEverywhereInCameroon => 'بع في كل مكان في الكاميرون';

  @override
  String get directNegotiation => 'تفاوض مباشر';

  @override
  String get integratedB2BMessaging => 'رسائل B2B متكاملة';

  @override
  String get published => 'تم النشر!';

  @override
  String get productPublishedSuccess => 'منتجك مرئي الآن في السوق. ستتلقى إشعاراً عندما يهتم مشترٍ.';

  @override
  String get perfect => 'ممتاز!';

  @override
  String get codeSent => 'تم إرسال الرمز!';

  @override
  String get resetCodeSentMessage => 'تم إرسال رمز إعادة التعيين إلى رقم هاتفك. تحقق من رسائلك النصية.';

  @override
  String get understood => 'مفهوم';

  @override
  String get fastBiometricLogin => 'تسجيل دخول سريع بالبصمة';

  @override
  String get or => 'أو';

  @override
  String views(int count) {
    return '$count مشاهدات';
  }

  @override
  String expiresInDays(int count) {
    return 'تنتهي في $count يوم (أيام)';
  }

  @override
  String get fruitsVegetables => 'فواكه وخضروات';

  @override
  String get dairy => 'منتجات الألبان';

  @override
  String get meatFish => 'لحوم وأسماك';

  @override
  String get bakery => 'مخبز';

  @override
  String get beverages => 'مشروبات';

  @override
  String get processedFoods => 'أطعمة معالجة';

  @override
  String get spicesCondiments => 'توابل وبهارات';

  @override
  String get frozenFoods => 'أطعمة مجمدة';

  @override
  String get statusPending => 'في انتظار';

  @override
  String get statusConfirmed => 'مؤكد';

  @override
  String get statusShipped => 'مُرسل';

  @override
  String get statusDelivered => 'مُسلم';

  @override
  String get statusCancelled => 'ملغي';

  @override
  String get unitKg => 'كغ';

  @override
  String get unitG => 'غ';

  @override
  String get unitL => 'ل';

  @override
  String get unitMl => 'مل';

  @override
  String get unitPiece => 'قطعة';

  @override
  String get unitBox => 'صندوق';

  @override
  String get unitPack => 'عبوة';
}
