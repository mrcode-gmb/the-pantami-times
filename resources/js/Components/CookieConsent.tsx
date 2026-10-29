import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Cookie, Shield, Check, X, Sliders, ExternalLink } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
}

const STORAGE_KEY = 'pantami_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true and locked
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Show banner after brief delay for smooth appearance
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.advertising === 'boolean') {
          setPreferences({
            essential: true,
            analytics: parsed.analytics ?? true,
            advertising: parsed.advertising ?? true,
          });
        }
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // Listen for custom event so user can re-open from footer
  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('open-cookie-preferences', handleOpen);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...prefs,
        timestamp: new Date().toISOString(),
      }));
    } catch (e) {
      console.warn('Unable to persist cookie consent:', e);
    }
    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, advertising: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ essential: true, analytics: false, advertising: false });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-4 md:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-card/95 p-5 shadow-2xl backdrop-blur-md md:p-6 text-foreground">
        
        {/* Main Banner View */}
        {!showPreferences ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Cookie className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-foreground flex items-center gap-2">
                  <span>We Respect Your Privacy &amp; Cookies</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Shield className="h-3 w-3" />
                    Google Compliant
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Pantami Times uses cookies and approved third-party services (including{' '}
                  <span className="font-medium text-foreground">Google AdSense</span>) to provide core site functionality, analyze web traffic, and display relevant, non-intrusive advertisements. You can accept all, reject non-essential cookies, or manage your preferences at any time.
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs">
                  <Link href="/cookie-policy" className="font-medium text-primary underline underline-offset-4 hover:opacity-80">
                    Cookie Policy
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link href="/privacy" className="font-medium text-primary underline underline-offset-4 hover:opacity-80">
                    Privacy Policy
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground"
                  >
                    <span>Google Ad Settings</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 md:flex-col md:items-stretch lg:flex-row lg:flex-shrink-0">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 lg:flex-none rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
              >
                Accept All Cookies
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="flex-1 lg:flex-none rounded-xl border border-border bg-muted/60 hover:bg-muted active:scale-95 px-3.5 py-2.5 text-xs font-semibold text-foreground transition"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border/80 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition"
                title="Customize specific cookie categories"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        ) : (
          /* Granular Preference Settings Modal */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2.5">
                <Sliders className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-base font-bold text-foreground">
                  Cookie &amp; Advertising Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                aria-label="Close preferences view"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Select which cookie categories you wish to allow. Essential cookies are required to deliver the core newsroom features and security.
            </p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {/* Category 1: Essential */}
              <div className="flex items-start justify-between rounded-xl border border-border/70 bg-muted/30 p-3">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Strictly Necessary Cookies</span>
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      Always Active
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Required for core security, CSRF token validation, font rendering, and saving your preferences. Cannot be deactivated.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-4 w-4 rounded accent-primary opacity-70 cursor-not-allowed"
                />
              </div>

              {/* Category 2: Analytics */}
              <div className="flex items-start justify-between rounded-xl border border-border/70 bg-muted/30 p-3">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-foreground">Analytics &amp; Performance Telemetry</span>
                  <p className="text-[11px] text-muted-foreground">
                    Aggregated metrics that help our editorial team understand which news stories and categories readers find most valuable.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-analytics-check"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Category 3: Advertising & AdSense */}
              <div className="flex items-start justify-between rounded-xl border border-border/70 bg-muted/30 p-3">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Google AdSense &amp; Advertising Partners</span>
                    <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      pub-3454126744747191
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Allows Google and authorized ad networks to serve non-intrusive advertisements. When enabled, ads may be tailored to your general interests.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="cookie-ads-check"
                  checked={preferences.advertising}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, advertising: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between border-t border-border/80 pt-3">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Back
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
                >
                  Reject All Optional
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 px-4 py-2 text-xs font-bold text-white transition shadow-sm"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save My Preferences</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
