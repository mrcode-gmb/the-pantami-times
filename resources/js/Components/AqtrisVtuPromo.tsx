import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Clock, 
  Flame, 
  Rocket, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Zap
} from 'lucide-react';

export interface VtuPackageFeature {
  text: string;
  highlight?: boolean;
}

export interface VtuPackage {
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
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
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

export const bannerItems = [
  {
    id: 1,
    image: '/images/ads/banner_first.png',
    alt: 'Aqtris Turnkey VTU & Fintech Platform - Launch Your App',
    url: 'https://aqtris.com/pricing/vtu-premium-all-in-one-platform',
    title: 'VTU Premium All-In-One Platform',
    subtitle: 'Automated bills, airtime, data & Play Store app · 29% OFF'
  },
  {
    id: 2,
    image: '/images/ads/banner_second.png',
    alt: 'Aqtris Turnkey Basic VTU Web and Mobile Platform',
    url: 'https://aqtris.com/pricing/vtu-basic-web-mobile-platform',
    title: 'VTU Basic Web & Mobile Platform',
    subtitle: 'Launch in 5-7 business days with Android APK & Play Store publishing'
  }
];

export const VtuBannerSlider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
      }, 4000);
    }
    return () => resetTimeout();
  }, [currentSlide, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerItems.length) % bannerItems.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
  };

  return (
    <div 
      className={`relative w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-lg group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Sponsor Pill */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white shadow">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Featured Partner · Aqtris Technologies</span>
      </div>

      {/* Slide Container */}
      <div className="relative aspect-[2.6/1] sm:aspect-[2.7/1] w-full overflow-hidden bg-slate-950">
        {bannerItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative"
              title={`${item.title} - Click to view direct pricing`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-16 sm:bottom-4 sm:left-6 text-white drop-shadow-md">
                <p className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </p>
                <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1">{item.subtitle}</p>
              </div>
            </a>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 p-1.5 sm:p-2 text-white backdrop-blur-md hover:bg-black/90 transition opacity-0 group-hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 p-1.5 sm:p-2 text-white backdrop-blur-md hover:bg-black/90 transition opacity-0 group-hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
          {bannerItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Small-size Banner for Sidebars (Articles & Show Pages)
 */
export const VtuSidebarBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeBanner = bannerItems[currentSlide];

  return (
    <div className={`rounded-xl border border-border/90 bg-card p-4 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Sponsored Partner
        </span>
        <span className="text-[10px] font-medium text-muted-foreground">Aqtris Tech</span>
      </div>

      {/* Small Banner Image Display */}
      <div className="relative aspect-[2.5/1] w-full rounded-lg overflow-hidden bg-slate-950 mb-3 group">
        <a 
          href={activeBanner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative"
          title={activeBanner.title}
        >
          <img
            src={activeBanner.image}
            alt={activeBanner.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-1.5 left-2 right-2 text-white">
            <span className="text-[11px] font-bold text-amber-300 line-clamp-1 flex items-center justify-between">
              {activeBanner.title}
              <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
            </span>
          </div>
        </a>

        {/* Small Slider Dots */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-full">
          {bannerItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-3.5 bg-amber-400' : 'w-1.5 bg-white/60'
              }`}
              aria-label={`Switch to banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Details & Copy */}
      <h4 className="text-sm font-bold font-serif text-foreground leading-snug">
        Launch Your Own Automated VTU &amp; Fintech App
      </h4>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
        Web portal, Super Admin, and Android APK on Google Play Store. Free hosting &amp; SSL.
      </p>

      {/* Mini Pricing Badge */}
      <div className="mt-2.5 flex items-baseline justify-between bg-muted/60 px-3 py-1.5 rounded-lg border border-border/70">
        <div>
          <span className="text-xs text-muted-foreground">From </span>
          <span className="text-sm font-extrabold text-foreground">₦330,000</span>
          <span className="text-[11px] text-muted-foreground line-through ml-1.5">₦450k</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">
          27% OFF
        </span>
      </div>

      {/* Mini CTA Action Buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href="https://aqtris.com/pricing/vtu-basic-web-mobile-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg bg-foreground text-background py-2 px-2 text-xs font-bold hover:opacity-90 transition text-center"
        >
          <span>View Plans</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <a
          href={`https://wa.me/2348037858023?text=${encodeURIComponent(
            'Hello Aqtris Technologies, I would like to inquire about turnkey VTU platforms seen on Pantami Times.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-2 px-2 text-xs font-bold hover:bg-emerald-500/20 transition text-center"
        >
          <span>WhatsApp</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

/**
 * In-Article Banner (for inside or directly after news articles)
 */
export const VtuInArticleBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`my-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-card to-card p-5 sm:p-6 shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="w-full md:w-5/12 aspect-[2.6/1] rounded-xl overflow-hidden shadow-md relative group">
          <a
            href="https://aqtris.com/pricing/vtu-premium-all-in-one-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full relative"
          >
            <img
              src="/images/ads/banner_first.png"
              alt="Aqtris Turnkey VTU Platform"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[11px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded">
              Turnkey VTU Platform
            </span>
          </a>
        </div>

        <div className="w-full md:w-7/12">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full">
              Special Offer
            </span>
            <span className="text-xs text-muted-foreground">Engineered by Aqtris</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif text-foreground leading-snug">
            Want Your Own Automated Telecom &amp; Bill Payment Business?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Get a turnkey Web Portal + Android Play Store App with automated data, airtime, and dedicated virtual accounts. Ready in 5–7 days.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://aqtris.com/pricing/vtu-premium-all-in-one-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-xs font-bold shadow transition"
            >
              <span>Explore Packages (From ₦330k)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://wa.me/2348037858023?text=${encodeURIComponent(
                'Hello Aqtris Technologies, I am reading an article on Pantami Times and want to discuss launching my VTU platform.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-2 text-xs font-bold hover:bg-emerald-500/20 transition"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AqtrisVtuPromoSection: React.FC<{ showSlider?: boolean }> = ({ showSlider = false }) => {
  return (
    <section id="own-vtu-platform" className="relative py-12 lg:py-16 bg-muted/30 border-y border-border/80">
      <div className="container">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
            <Rocket className="w-3.5 h-3.5 text-primary" />
            <span>Turnkey Fintech Solutions by Aqtris</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-foreground">
            Launch Your Own VTU Website &amp; Mobile App
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Start your automated digital airtime, data subscription, and utility bill payment business. Engineered by{' '}
            <a 
              href="https://aqtris.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-primary underline underline-offset-4"
            >
              Aqtris Technologies
            </a>{' '}
            with dedicated virtual bank accounts, auto-routing APIs, and Google Play Store deployment.
          </p>

          {showSlider && (
            <div className="mt-6">
              <VtuBannerSlider />
            </div>
          )}
        </div>

        {/* 2-Column Product Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {vtuPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-3xl border transition-all duration-300 ${
                pkg.popular
                  ? 'border-amber-500/80 bg-card shadow-xl ring-2 ring-amber-500/40 hover:shadow-2xl'
                  : 'border-border/90 bg-card shadow-md hover:border-primary/50'
              } p-6 sm:p-8`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                    <Flame className="w-3.5 h-3.5 text-amber-200" />
                    Most Popular · Turnkey
                  </span>
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{pkg.deliveryTimeline}</span>
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                  {pkg.name}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pkg.shortDescription}
                </p>

                {/* Pricing Block */}
                <div className="mt-6 rounded-2xl bg-muted/50 p-4 border border-border/80">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                      {pkg.price}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-muted-foreground line-through">
                      {pkg.comparePrice}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {pkg.discountPercent}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    One-time lifetime setup fee • Zero monthly subscription fees
                  </p>
                </div>

                {/* Feature List */}
                <div className="mt-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    Package Features &amp; Integrations:
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                            feat.highlight
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span
                          className={
                            feat.highlight
                              ? 'font-bold text-foreground'
                              : 'text-muted-foreground'
                          }
                        >
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-border/80 space-y-3">
                <a
                  href={pkg.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-sm font-bold transition duration-200 active:scale-95 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 hover:-translate-y-0.5'
                      : 'bg-foreground text-background hover:opacity-90 shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <span>{pkg.buttonText}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/2348037858023?text=${encodeURIComponent(
                    `Hello Aqtris Technologies, I would like to inquire about the ${pkg.name} (${pkg.price}) seen on Pantami Times.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* iOS Notice Banner */}
        <div className="mt-10 mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Need Apple App Store (iOS) Deployment?
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add complete iOS app build and Apple App Store publishing to any package for only{' '}
                  <span className="font-bold text-primary">₦100,000</span> (3–5 business days).
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/2348037858023?text=Hello%20Aqtris%20Technologies%2C%20I%20want%20to%20discuss%20custom%20VTU%20features%20and%20iOS%20deployment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition whitespace-nowrap"
            >
              <span>Consult with Engineers</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
