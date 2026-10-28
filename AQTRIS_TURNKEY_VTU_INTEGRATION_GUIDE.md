# Aqtris Turnkey VTU Platform — Cross-Platform Integration & Blueprint Guide

> **Official Blueprint & Architecture Guide**  
> *Engineered by Aqtris Technologies*  
> Use this guide to seamlessly replicate and deploy the turnkey VTU promotion, pricing cards, SEO rich snippets, and mobile banner slider across any website, web application, or mobile app.

---

## 1. Executive Summary

This feature allows any platform in the Aqtris ecosystem (such as Airplug Pay) to promote white-label turnkey VTU & Fintech solutions engineered by Aqtris Technologies. Visitors and mobile app users can review packages, understand delivery timelines, check transparent pricing, and connect directly to order on [aqtris.com](https://aqtris.com) or chat live with engineers on WhatsApp.

### Key Pillars
* **High Conversion**: Direct comparison pricing with strike-through discounts and delivery timelines.
* **Dual Integration**: Fully implemented on both **Web (React / Tailwind CSS / Inertia / Schema.org SEO)** and **Mobile (Flutter iOS / Android)**.
* **Direct App Launching**: WhatsApp CTA buttons trigger the native WhatsApp application on mobile devices instead of opening inside webviews.
* **Automated Slider**: 3-second auto-advancing banner slider with smooth animations and touch gesture support.

---

## 2. Product Catalog & Pricing Matrix

| Feature / Detail | VTU Basic Web & Mobile Platform | VTU Premium All-In-One Platform | iOS App Store Add-on |
| :--- | :--- | :--- | :--- |
| **Product URL** | [`aqtris.com/pricing/vtu-basic-web-mobile-platform`](https://aqtris.com/pricing/vtu-basic-web-mobile-platform) | [`aqtris.com/pricing/vtu-premium-all-in-one-platform`](https://aqtris.com/pricing/vtu-premium-all-in-one-platform) | WhatsApp Direct Consultation |
| **Setup Fee** | **₦330,000** | **₦500,000** | **₦100,000** |
| **Compare Price** | ~~₦450,000~~ (27% OFF) | ~~₦700,000~~ (29% OFF) | Standard Add-on |
| **Billing Model** | One-time lifetime setup (₦0 monthly) | One-time lifetime setup (₦0 monthly) | One-time add-on |
| **Delivery Time** | **5 – 7 Business Days** | **7 – 10 Business Days** | **3 – 5 Business Days** |
| **Badge** | `Web + Android Mobile` | `🔥 Most Popular · Complete Turnkey` | `iOS Native App` |
| **API Providers** | **2 Providers** for Data & Airtime Routing (with Auto-Switch) | **4 Providers** with Automated Failover & Balance Routing | N/A |
| **Gateways** | **1 Gateway** (Paystack, Monnify, or PalmPay) | **2 to 3 Gateways** (Paystack, Monnify, PalmPay) | Apple In-App / Paystack |
| **Web Portal** | Included (User + Reseller Portal) | Included (Enterprise portal) | N/A |
| **Admin Control** | Included (Transactions, Users, Analytics) | Advanced (Fraud engine, Auto-reversals, Ledgers) | N/A |
| **Mobile App** | Android APK + Play Store Publishing | Android APK + Play Store Publishing | Native iOS + TestFlight + App Store |
| **Airtime / Data** | Automated Top-ups (MTN, Glo, Airtel, 9mobile) | Automated Top-ups (SME, CG & Gifting) | Same |
| **Bill Payments** | Optional upgrade | **Automated Electricity + Cable TV (DStv, GOtv, Startimes)** | Same |
| **Airtime to Cash** | Not included in Basic | **Included (Automated carrier engine)** | Same |
| **Cashback & Points**| Not included in Basic | **Included (Loyalty points & instant wallet reward)** | Same |
| **Affiliate System** | Not included in Basic | **Multi-Tier Referral Commission Engine** | Same |
| **Cloud Hosting** | Free 1-Year Cloud Server + SSL | Free 1-Year Premium Cloud Server + Custom Domain | Same |
| **Support** | **24/7 Dedicated Engineering Support** | **24/7 Priority Engineering Support** | Lifetime Support |
| **Handover** | Full Source Code & Deployment | Source Code, Admin Training & Lifetime Updates | Apple Account Setup |

---

## 3. Web Implementation Blueprint (React / Tailwind / Inertia)

### 3.1 JavaScript Data Structure

```typescript
interface VtuPackageFeature {
    text: string;
    highlight?: boolean;
}

interface VtuPackage {
    id: string;
    name: string;
    badge: string;
    badgeColor: string;
    popular?: boolean;
    price: string;
    comparePrice: string;
    discountPercent: string;
    deliveryTimeline: string;
    shortDescription: string;
    productUrl: string;
    buttonText: string;
    features: VtuPackageFeature[];
}

export const vtuPackages: VtuPackage[] = [
    {
        id: 'basic',
        name: 'VTU Basic Web & Mobile Platform',
        badge: 'Web + Android Mobile',
        badgeColor: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950/60 dark:text-primary-300 dark:border-primary-800',
        popular: false,
        price: '₦330,000',
        comparePrice: '₦450,000',
        discountPercent: '27% OFF',
        deliveryTimeline: '5 - 7 Business Days',
        shortDescription: 'Everything you need to launch your own automated VTU business with a high-performance web portal, Android app, and 2 data API providers.',
        productUrl: 'https://aqtris.com/pricing/vtu-basic-web-mobile-platform',
        buttonText: 'Get Basic Platform',
        features: [
            { text: 'Custom Branded Web Portal (User Dashboard + Reseller Portal)' },
            { text: 'Super Admin Control Panel (Transactions, Analytics & Users)' },
            { text: 'Android Mobile App (.APK build & Google Play Store publishing)' },
            { text: 'Automated Airtime Top-Up (MTN, Airtel, Glo, 9mobile)' },
            { text: 'Automated Data Subscriptions (SME, CG & Direct Gifting)' },
            { text: '2 API Providers for Data & Airtime Routing (with Auto-Switch)', highlight: true },
            { text: '1 Payment Gateway Integrated (Paystack, Monnify, or PalmPay)', highlight: true },
            { text: 'Automated Dedicated Virtual Accounts & Instant Funding' },
            { text: 'Free 1-Year Cloud Server Hosting + Free SSL Certificate' },
            { text: '24/7 Dedicated Engineering & Technical Support', highlight: true },
            { text: 'Full Source Code Ownership & Deployment Handover' },
        ],
    },
    {
        id: 'premium',
        name: 'VTU Premium All-In-One Platform',
        badge: 'Most Popular · Complete Turnkey',
        badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-sm',
        popular: true,
        price: '₦500,000',
        comparePrice: '₦700,000',
        discountPercent: '29% OFF',
        deliveryTimeline: '7 - 10 Business Days',
        shortDescription: 'A complete enterprise VTU ecosystem with 4 API providers, 2 to 3 payment gateways, electricity bills, cable TV, cashbacks, and airtime to cash.',
        productUrl: 'https://aqtris.com/pricing/vtu-premium-all-in-one-platform',
        buttonText: 'Get Premium Platform',
        features: [
            { text: 'Everything included in the Basic Platform', highlight: true },
            { text: '4 API Providers with Automated Failover & Balance Routing', highlight: true },
            { text: '2 to 3 Payment Gateways Integrated (Paystack, Monnify, PalmPay)', highlight: true },
            { text: 'Automated Electricity Bill Payments (IKEDC, EKEDC, AEDC, IBEDC, etc.)' },
            { text: 'Cable TV Subscription Renewal (DStv, GOtv, Startimes, Showmax)' },
            { text: 'Automated Airtime to Cash Conversion Engine' },
            { text: 'User Cashback Rewards & Wallet Loyalty Points System' },
            { text: 'Multi-Tier Referral & Affiliate Commission System' },
            { text: 'Dedicated Mobile App Published on Google Play Store' },
            { text: 'Free 1-Year Premium Cloud Server + Free Custom Domain Setup' },
            { text: 'Advanced Fraud Protection, Real-Time Ledgers & Auto-Reversals' },
            { text: '24/7 Priority Engineering & Technical Support', highlight: true },
            { text: 'Complete Turnkey Handover, Admin Training & Lifetime Core Updates' },
        ],
    },
];
```

### 3.2 JSX Section Component

```tsx
<section id="own-vtu-platform" className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700 dark:border-primary-500/30 dark:bg-primary-950/70 dark:text-primary-300 shadow-sm">
                <i className="fa fa-rocket text-primary-600 dark:text-primary-400" />
                <span>Turnkey Fintech Solutions by Aqtris</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-tight">
                Want Your Own VTU Website &amp; Mobile App Like This One?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Launch your own fully automated digital VTU and bill payment business under your own brand. Engineered by <span className="font-semibold text-slate-900 dark:text-white">Aqtris Technologies</span> with dedicated virtual accounts, automated top-ups, and Google Play Store deployment.
            </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {vtuPackages.map((pkg) => (
                <div
                    key={pkg.id}
                    className={`relative flex flex-col justify-between rounded-3xl border transition duration-300 ${
                        pkg.popular
                            ? 'border-primary-500/80 bg-white dark:bg-slate-900 shadow-2xl shadow-primary-500/15 ring-2 ring-primary-500/40 hover:border-primary-500'
                            : 'border-slate-200/90 bg-white/90 dark:border-slate-800 dark:bg-slate-900/80 shadow-lg hover:border-slate-300 dark:hover:border-slate-700'
                    } p-7 sm:p-9 backdrop-blur-sm`}
                >
                    {pkg.popular && (
                        <div className="absolute -top-3.5 right-6 z-10">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                                <i className="fa fa-fire text-amber-200" />
                                Most Popular · Turnkey
                            </span>
                        </div>
                    )}

                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${pkg.badgeColor}`}>
                                {pkg.badge}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <i className="fa fa-clock text-primary-500" />
                                <span>{pkg.deliveryTimeline}</span>
                            </span>
                        </div>

                        <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
                            {pkg.name}
                        </h3>

                        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {pkg.shortDescription}
                        </p>

                        {/* Pricing Block */}
                        <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    {pkg.price}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-slate-400 line-through">
                                    {pkg.comparePrice}
                                </span>
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                    {pkg.discountPercent}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                One-time lifetime setup fee • Zero monthly subscription fees
                            </p>
                        </div>

                        {/* Feature List */}
                        <div className="mt-6">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Package Features &amp; Integrations:
                            </h4>
                            <ul className="mt-4 space-y-3 text-sm">
                                {pkg.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                                            feat.highlight
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            <i className="fa fa-check text-[10px]" />
                                        </div>
                                        <span className={feat.highlight ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}>
                                            {feat.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                        <a
                            href={pkg.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-sm font-extrabold transition duration-200 active:scale-98 ${
                                pkg.popular
                                    ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white shadow-lg shadow-primary-500/30 hover:from-primary-700 hover:to-cyan-700 hover:-translate-y-0.5'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-md hover:-translate-y-0.5'
                            }`}
                        >
                            <span>{pkg.buttonText}</span>
                            <i className="fa fa-arrow-up-right-from-square text-xs" />
                        </a>

                        <a
                            href={`https://wa.me/2348037858023?text=${encodeURIComponent(
                                `Hello Aqtris Technologies, I would like to inquire about the ${pkg.name} (${pkg.price}) seen on the website.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 transition"
                        >
                            <i className="fa-brands fa-whatsapp text-sm text-emerald-600 dark:text-emerald-400" />
                            <span>Ask Questions on WhatsApp</span>
                        </a>
                    </div>
                </div>
            ))}
        </div>

        {/* iOS Notice Banner */}
        <div className="mt-10 mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        <i className="fa-brands fa-apple text-xl" />
                    </div>
                    <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Need Apple App Store (iOS) Deployment?
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            Add complete iOS app build and Apple App Store publishing to any package for only <span className="font-bold text-primary-600 dark:text-primary-400">₦100,000</span> (3–5 business days).
                        </p>
                    </div>
                </div>
                <a
                    href="https://wa.me/2348037858023?text=Hello%20Aqtris%20Technologies%2C%20I%20want%20to%20discuss%20custom%20VTU%20features%20and%20iOS%20deployment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 transition whitespace-nowrap"
                >
                    <i className="fa-brands fa-whatsapp text-emerald-600 dark:text-emerald-400" />
                    <span>Consultation with Engineers</span>
                </a>
            </div>
        </div>
    </div>
</section>
```

---

## 4. SEO & Schema.org Rich Snippets Architecture

Add this JSON-LD schema to your `<head>` markup so search engines index the VTU packages with rich product cards and pricing snippets:

```html
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Turnkey VTU & Fintech Software Platforms by Aqtris",
    "description": "Ready-to-launch VTU web portals and mobile apps engineered by Aqtris Technologies.",
    "url": "https://yourdomain.com/#own-vtu-platform",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "VTU Basic Web & Mobile Platform",
          "description": "Everything you need to launch your own automated VTU business with a high-performance web portal, Android app, and 2 data API providers.",
          "url": "https://aqtris.com/pricing/vtu-basic-web-mobile-platform",
          "image": "https://yourdomain.com/logo.png",
          "brand": {
            "@type": "Brand",
            "name": "Aqtris Technologies"
          },
          "offers": {
            "@type": "Offer",
            "price": "330000",
            "priceCurrency": "NGN",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://aqtris.com/pricing/vtu-basic-web-mobile-platform",
            "seller": {
              "@type": "Organization",
              "name": "AQTRIS TECH"
            }
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "VTU Premium All-In-One Platform",
          "description": "A complete enterprise VTU ecosystem with 4 API providers, 2 to 3 payment gateways, electricity bills, cable TV, cashbacks, and airtime to cash.",
          "url": "https://aqtris.com/pricing/vtu-premium-all-in-one-platform",
          "image": "https://yourdomain.com/logo.png",
          "brand": {
            "@type": "Brand",
            "name": "Aqtris Technologies"
          },
          "offers": {
            "@type": "Offer",
            "price": "500000",
            "priceCurrency": "NGN",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "url": "https://aqtris.com/pricing/vtu-premium-all-in-one-platform",
            "seller": {
              "@type": "Organization",
              "name": "AQTRIS TECH"
            }
          }
        }
      }
    ]
  }
]
</script>
```

---

## 5. Flutter Mobile App Blueprint

### 5.1 Banner Image Specifications & Host Server Paths
Exact direct filesystem paths on the computer/server:
* **Banner 1 (Direct Computer Path - Original)**: `/var/www/html/airplugapp/assets/images/banner first.png` (Dimensions: 1983 × 793 px, ~2.5:1 aspect ratio)
* **Banner 1 (Normalized Project Path)**: `/var/www/html/airplugapp/assets/images/banner_first.png` (`assets/images/banner_first.png`)
* **Banner 2 (Direct Computer Path - Original)**: `/var/www/html/airplugapp/assets/images/banner second.png` (Dimensions: 2048 × 768 px, ~2.67:1 aspect ratio)
* **Banner 2 (Normalized Project Path)**: `/var/www/html/airplugapp/assets/images/banner_second.png` (`assets/images/banner_second.png`)
* **Asset Declaration in `pubspec.yaml`**:
  ```yaml
  flutter:
    assets:
      - assets/images/
  ```

### 5.2 Auto-Sliding Banner Widget (`_DashboardPromoSlider`)

Place below the Services section on the dashboard:

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class _DashboardPromoSlider extends StatefulWidget {
  const _DashboardPromoSlider({
    required this.isDark,
    required this.onTap,
  });

  final bool isDark;
  final VoidCallback onTap;

  @override
  State<_DashboardPromoSlider> createState() => _DashboardPromoSliderState();
}

class _DashboardPromoSliderState extends State<_DashboardPromoSlider> {
  static const List<String> _bannerImages = <String>[
    'assets/images/banner_first.png',
    'assets/images/banner_second.png',
  ];

  late final PageController _pageController;
  Timer? _timer;
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 3), (Timer timer) {
      if (!mounted || !_pageController.hasClients) return;
      final int nextPage = (_currentPage + 1) % _bannerImages.length;
      _pageController.animateToPage(
        nextPage,
        duration: const Duration(milliseconds: 650),
        curve: Curves.easeInOutCubic,
      );
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: widget.isDark
                ? const Color(0xFF333A44)
                : const Color(0xFFE2E8F0),
          ),
          boxShadow: <BoxShadow>[
            BoxShadow(
              color: Colors.black.withValues(alpha: widget.isDark ? 0.2 : 0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: AspectRatio(
          aspectRatio: 2.55,
          child: Stack(
            fit: StackFit.expand,
            children: <Widget>[
              PageView.builder(
                controller: _pageController,
                onPageChanged: (int index) {
                  setState(() => _currentPage = index);
                  _startTimer();
                },
                itemCount: _bannerImages.length,
                itemBuilder: (BuildContext context, int index) {
                  return GestureDetector(
                    onTap: widget.onTap,
                    child: Image.asset(
                      _bannerImages[index],
                      fit: BoxFit.cover,
                    ),
                  );
                },
              ),
              // Dots Indicator
              Positioned(
                bottom: 8,
                left: 0,
                right: 0,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List<Widget>.generate(
                    _bannerImages.length,
                    (int i) {
                      final bool isActive = i == _currentPage;
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 3),
                        width: isActive ? 16 : 5,
                        height: 4,
                        decoration: BoxDecoration(
                          color: isActive
                              ? Colors.white
                              : Colors.white.withValues(alpha: 0.45),
                          borderRadius: BorderRadius.circular(3),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 5.3 External Browser & Native WhatsApp Launcher (Zero-WebView Architecture)

To comply with Google Play Store policies and prevent `ActivityNotFoundException` on Android 11+ (API 30+ through Android 15/16 preview), do **not** rely solely on Flutter's basic `launchUrl(..., mode: LaunchMode.externalApplication)`. Implement the **Native MethodChannel 4-Tier Launch Engine** and comprehensive `<queries>` declaration.

#### 5.3.1 Android Manifest `<queries>` (`android/app/src/main/AndroidManifest.xml`)
Declare both browsable and generic web queries, plus explicit package entries for all popular Android browsers:

```xml
    <queries>
        <!-- Standard web browser queries for http/https -->
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <category android:name="android.intent.category.BROWSABLE"/>
            <data android:scheme="https"/>
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <data android:scheme="https"/>
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <category android:name="android.intent.category.BROWSABLE"/>
            <data android:scheme="http"/>
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <data android:scheme="http"/>
        </intent>

        <!-- Common mobile browsers to guarantee direct package visibility across all OEMs -->
        <package android:name="com.android.chrome"/>
        <package android:name="com.transsion.phoenix"/>
        <package android:name="com.sec.android.app.sbrowser"/>
        <package android:name="org.mozilla.firefox"/>
        <package android:name="com.opera.browser"/>
        <package android:name="com.brave.browser"/>
        <package android:name="com.microsoft.emmx"/>

        <!-- WhatsApp & WhatsApp Business schemes -->
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <data android:scheme="whatsapp"/>
        </intent>
        <package android:name="com.whatsapp"/>
        <package android:name="com.whatsapp.w4b"/>

        <!-- Email & Phone dialer queries -->
        <intent>
            <action android:name="android.intent.action.VIEW"/>
            <data android:scheme="mailto"/>
        </intent>
        <intent>
            <action android:name="android.intent.action.DIAL"/>
            <data android:scheme="tel"/>
        </intent>
    </queries>
```

#### 5.3.2 iOS Configuration (`ios/Runner/Info.plist`)
```xml
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>https</string>
		<string>http</string>
		<string>whatsapp</string>
		<string>mailto</string>
		<string>tel</string>
	</array>
```

#### 5.3.3 Native Android Kotlin Engine (`MainActivity.kt`)
Add this 4-tier launching engine to `android/app/src/main/kotlin/.../MainActivity.kt`:

```kotlin
package com.airplugdatasub

import android.content.Intent
import android.net.Uri
import io.flutter.embedding.android.FlutterFragmentActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodCall
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterFragmentActivity() {
    companion object {
        private const val BROWSER_CHANNEL = "airplug/external_browser"
    }

    private var browserChannel: MethodChannel? = null

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        browserChannel = MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            BROWSER_CHANNEL,
        )
        browserChannel?.setMethodCallHandler { call: MethodCall, result: MethodChannel.Result ->
            if (call.method == "openUrl") {
                val url = call.argument<String>("url")
                if (url.isNullOrBlank()) {
                    result.success(false)
                } else {
                    result.success(openExternalBrowser(url))
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun openExternalBrowser(url: String): Boolean {
        val parsedUri = try {
            Uri.parse(url.trim())
        } catch (e: Exception) {
            return false
        }

        // Tier 1: Direct external browser intent with BROWSABLE category
        try {
            val intent = Intent(Intent.ACTION_VIEW, parsedUri).apply {
                addCategory(Intent.CATEGORY_BROWSABLE)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
            return true
        } catch (ignored: Exception) {}

        // Tier 2: Direct intent without BROWSABLE category
        try {
            val intent = Intent(Intent.ACTION_VIEW, parsedUri).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(intent)
            return true
        } catch (ignored: Exception) {}

        // Tier 3: Target installed browser packages directly (Chrome, Phoenix, Samsung, Firefox, etc.)
        val browserPackages = listOf(
            "com.android.chrome",
            "com.transsion.phoenix",
            "com.sec.android.app.sbrowser",
            "org.mozilla.firefox",
            "com.opera.browser",
            "com.brave.browser",
            "com.microsoft.emmx"
        )
        for (pkg in browserPackages) {
            try {
                val pkgIntent = Intent(Intent.ACTION_VIEW, parsedUri).apply {
                    setPackage(pkg)
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                startActivity(pkgIntent)
                return true
            } catch (ignored: Exception) {}
        }

        // Tier 4: Fallback to system Chooser dialog
        return try {
            val intent = Intent(Intent.ACTION_VIEW, parsedUri).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            val chooser = Intent.createChooser(intent, "Open in Browser").apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            startActivity(chooser)
            true
        } catch (e: Exception) {
            false
        }
    }

    override fun onDestroy() {
        browserChannel?.setMethodCallHandler(null)
        browserChannel = null
        super.onDestroy()
    }
}
```

#### 5.3.4 Dart Utility (`lib/core/utils/external_launcher.dart`)
```dart
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';

class ExternalLauncher {
  ExternalLauncher._();

  static const MethodChannel _browserChannel =
      MethodChannel('airplug/external_browser');

  /// Opens [urlString] in an external mobile browser, strictly avoiding in-app WebViews.
  static Future<bool> openBrowser(String urlString) async {
    final String trimmed = urlString.trim();
    if (trimmed.isEmpty) return false;

    // 1. Android native intent bridge (Chrome, Phoenix, Samsung, system chooser)
    if (!kIsWeb && Platform.isAndroid) {
      try {
        final bool? nativeResult = await _browserChannel.invokeMethod<bool>(
          'openUrl',
          <String, dynamic>{'url': trimmed},
        );
        if (nativeResult == true) return true;
      } catch (_) {}
    }

    final Uri? uri = Uri.tryParse(trimmed);
    if (uri == null) return false;

    // 2. url_launcher external application mode
    try {
      if (await launchUrl(uri, mode: LaunchMode.externalApplication)) return true;
    } catch (_) {}

    // 3. Fallback platform default
    try {
      if (await launchUrl(uri, mode: LaunchMode.platformDefault)) return true;
    } catch (_) {}

    return false;
  }

  /// Launches native WhatsApp app or falls back to external browser
  static Future<bool> openWhatsApp({
    required String phone,
    required String message,
  }) async {
    final String cleanPhone = phone.replaceAll(RegExp(r'[^0-9]'), '');
    final String encoded = Uri.encodeComponent(message);

    final Uri appUri =
        Uri.parse('whatsapp://send?phone=$cleanPhone&text=$encoded');
    final String webUrl = 'https://wa.me/$cleanPhone?text=$encoded';

    try {
      if (await launchUrl(appUri, mode: LaunchMode.externalNonBrowserApplication)) {
        return true;
      }
    } catch (_) {}

    return openBrowser(webUrl);
  }
}
```

### 5.4 Typography & Brand Consistency Guidelines
- Avoid heavy bold font weights (`FontWeight.bold`, `FontWeight.w700`, `FontWeight.w800`, `FontWeight.w900`) across all titles, badges, and action buttons.
- Use clean regular (`FontWeight.w400`) for descriptive copy and medium (`FontWeight.w500`) for headers, prices, and button labels.
- Soft shadows (`BoxShadow` with blur 8–10 and alpha 0.05) should be used instead of borders for clean fintech cards.

---

## 6. Lead Generation & Pre-Filled WhatsApp Messages

Use these URL-encoded templates for WhatsApp CTAs:

| Intent | Message Template |
| :--- | :--- |
| **Basic Package (₦330k)** | `Hello Aqtris Technologies, I would like to inquire about the VTU Basic Web & Mobile Platform (₦330,000) seen on the app.` |
| **Premium Package (₦500k)** | `Hello Aqtris Technologies, I would like to inquire about the VTU Premium All-In-One Platform (₦500,000) seen on the app.` |
| **Apple iOS Add-on (₦100k)** | `Hello Aqtris Technologies, I am interested in adding the Apple App Store (iOS) deployment (₦100,000) to my VTU platform package.` |
| **Custom Engineering** | `Hello Aqtris Technologies engineering team, I want to discuss a custom fintech/VTU solution.` |

---

## 7. Fast Integration Checklist for New Projects

When deploying to another website or app:
1. **Copy the Data Object**: Use the `vtuPackages` array from Section 3.1.
2. **Add Section to Landing Page**: Insert between social proof/testimonials and the FAQ section.
3. **Include Schema.org JSON-LD**: Paste the ItemList Product schema (Section 4) in the page `<head>`.
4. **Copy the 2 Banner Images**: Place `banner_first.png` and `banner_second.png` in `assets/images/`.
5. **Mount `_DashboardPromoSlider`**: Insert below the services/features grid on the mobile home screen.
6. **Register Route**: Map `/own-vtu-app` to `OwnVtuAppPage`.
7. **Verify External Browser Modes**: Ensure `LaunchMode.externalApplication` for websites and `LaunchMode.externalNonBrowserApplication` for WhatsApp.
