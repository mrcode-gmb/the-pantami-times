import { Facebook, Twitter, Instagram, Linkedin, Search, Sun, Moon, ChevronDown, Home } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/Components/ThemeProvider";
import { PantamiLogoCompact } from "@/Components/PantamiLogo";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

// Navigation items - will be populated from categories
interface SubCategory {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  priority: string;
  posts_count?: number;
  subcategories?: SubCategory[];
}

interface NavItem {
  label: string;
  href: string;
  slug?: string;
  priority: string;
  subcategories?: SubCategory[];
}

const staticNavItems: NavItem[] = [
  // { label: "HOME", href: "/" },
  // { label: "CATEGORIES", href: "/categories" },
];

interface HeaderProps {
  categories?: Category[];
  activeCategory?: string | null; // Category slug to keep dropdown open
}

export const Header: React.FC<HeaderProps> = ({ categories = [], activeCategory = null }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollShadow, setShowScrollShadow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Auto-open dropdown for active category
  useEffect(() => {
    if (activeCategory) {
      const category = categories.find(cat => cat.slug === activeCategory);
      if (category) {
        setOpenDropdown(category.name.toUpperCase());
      }
    }
  }, [activeCategory, categories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown on click
  const toggleDropdown = (label: string, hasSubcategories: boolean, href: string) => {
    if (hasSubcategories) {
      setOpenDropdown(openDropdown === label ? null : label);
    } else {
      // Navigate directly if no subcategories
      router.get(href);
    }
  };

  // Create navigation items from categories
  const navItems: NavItem[] = [
    ...staticNavItems,
    ...categories.slice(0, 8).sort((a:any, b:any) => a.priority - b.priority).map(cat => ({
      label: cat.name.toUpperCase(),
      href: `/category/${cat.slug}`,
      slug: cat.slug,
      priority: cat.priority,
      subcategories: cat.subcategories || []
    }))
  ];

  // Check if navigation is scrollable and show shadow
  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollWidth, clientWidth } = navRef.current;
        setShowScrollShadow(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [navItems]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.get(route('search.index', { q: searchQuery }));
      setSearchOpen(false);
    }
  };

  return (
    <header className="bg-background sticky bg-[#f0a500] border-b-2 border-[#d99200] top-0 z-50 shadow-sm lg:mb-12">
      {/* Top Bar - Guardian Style */}
      <div className="bg-[#1a1f2e] text-white">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://www.instagram.com/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            {/* Date & Theme */}
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <span className="hidden md:block">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:text-[#f0a500] transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Bar */}
      <div className="container py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Home/>
          </Link>
          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
            <Link href="/">
              <PantamiLogoCompact />
            </Link>
          </div>

          {/* Search Icon */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-3 animate-in slide-in-from-top">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0a500] bg-background text-foreground"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#f0a500] text-white rounded-lg hover:bg-[#d99200] transition-colors font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation - Guardian Style */}
      <nav className="bg-[#f0a500] border-[#d99200] relative" ref={dropdownRef}>
        <div className="container">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div
              ref={navRef}
              className="flex items-center gap-1 overflow-x-auto scrollbar-hide relative"
            >
              {navItems.sort((a:any, b:any) => a.priority - b.priority).map((item) => {
                const hasSubcategories:any = item.subcategories && item.subcategories.length > 0;
                const isActive = openDropdown === item.label || item.label === "NEWS" && !openDropdown;
                // Get the active category or first category with subcategories
                return (
                  <div key={item.label} className="relative border-r ">
                    <button
                      onClick={() => toggleDropdown(item.label, hasSubcategories, item.href)}
                      className={`px-4 py-3 text-sm news-title-sm  text-black hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide flex items-center gap-1 ${isActive ? 'bg-white' : ''
                        }`}
                    >
                      {item.label}
                      {hasSubcategories && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                  </div>
                );
              })}

              {/* Scroll Shadow Indicator */}
              {showScrollShadow && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f0a500] to-transparent pointer-events-none" />
              )}
            </div>
            <Link
              href="/e-paper"
              className="px-6 py-2 news-title-sm text-sm bg-[#1a1f2e] text-white rounded text-sm hover:bg-[#2d3748] transition-colors whitespace-nowrap ml-2"
            >
              e-Paper
            </Link>
          </div>
        </div>

        {/* Dropdown Panel - Below Navigation - Always Visible */}
        <div className="absolute hidden bg-[#f0a500] border-b-2 border-[#d99200] lg:block top-full left-0 right-0 bg-muted text-muted-foreground z-50">
          <div className="container overflow-x-auto scrollbar-hide">
            {(() => {
              // Get the active category or first category with subcategories
              const activeItem = navItems.find(item => item.label === openDropdown) || 
                                navItems.find(item => item.subcategories && item.subcategories.length > 0) ||
                                navItems[0];
              
              if (!activeItem) return null;

              return (
                <div className="gap-4 flex flex-row min-w-max">
                  {/* Main Category Link */}
                  <Link
                    href={activeItem.href}
                    className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors flex-shrink-0"
                  >
                    <div className="text-foreground news-title-sm text-sm group-hover:text-[#f0a500] transition-colors">
                      {activeItem.label}
                    </div>
                  </Link>
                  
                  {/* Divider */}
                  <div className="w-px bg-border self-stretch my-2"></div>
                  
                  {/* Subcategories */}
                  {activeItem.subcategories && activeItem.subcategories.length > 0 ? (
                    activeItem.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${activeItem.slug}/${sub.slug}`}
                        className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors flex-shrink-0"
                      >
                        <div className="text-foreground news-title-sm text-sm group-hover:text-[#f0a500] transition-colors">
                          {sub.name}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-sm news-title-sm text-sm text-muted-foreground italic">
                      No subcategories available
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          {/* Right shadow indicator */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-[#1a1f2e] to-transparent" />
        </div>

        <div className="containers py-0 relative">
          {/* Mobile Navigation - Horizontal Scrollable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max">
              {navItems.map((item) => {
                const hasSubcategories = item.subcategories && item.subcategories.length > 0;
                const isActive = openDropdown === item.label || item.label === "NEWS" && !openDropdown;

                return (
                  <button
                    key={item.label}
                    onClick={() => toggleDropdown(item.label, hasSubcategories, item.href)}
                    className={`px-3 py-3 text-xs news-title-sm border-r border-black text-black hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide flex items-center gap-1 ${isActive ? 'bg-[#9c6c0d]' : ''
                      }`}
                  >
                    {item.label}
                    {hasSubcategories && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                );
              })}
              <Link
                href="/e-paper"
                className="px-4 py-2 bg-[#1a1f2e] news-title-sm text-white rounded font-semibold text-xs hover:bg-[#2d3748] transition-colors whitespace-nowrap ml-2"
              >
                e-Paper
              </Link>
            </div>

            {/* Scroll Shadow Indicator for Mobile */}
          </div>
            {/* <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f0a500] to-transparent pointer-events-none" /> */}
            <div className="pointer-events-none absolute right-0 bottom-0 h-full w-10 bg-gray-400 opacity-50" />
        </div>

        {/* Mobile Dropdown Panel - Always Visible */}
        <div className="md:hidden relative bg-muted text-muted-foreground">
          <div className="container overflow-x-auto scrollbar-hide">
            {(() => {
              // Get the active category or first category with subcategories
              const activeItem = navItems.find(item => item.label === openDropdown) || 
                                navItems.find(item => item.subcategories && item.subcategories.length > 0) ||
                                navItems[0];
              
              if (!activeItem) return null;

              return (
                <div className="gap-3 flex flex-row min-w-max">
                  {/* Main Category Link */}
                  <Link
                    href={activeItem.href}
                    className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors flex-shrink-0"
                  >
                    <div className="text-sm news-title-sm capitalize text-foreground group-hover:text-[#f0a500] transition-colors">
                      {activeItem.label}
                    </div>
                    {/* <div className="text-[10px] text-muted-foreground mt-0.5">
                      Main
                    </div> */}
                  </Link>
                  
                  {/* Divider */}
                  <div className="w-px bg-border self-stretch my-2"></div>
                  
                  {/* Subcategories */}
                  {activeItem.subcategories && activeItem.subcategories.length > 0 ? (
                    activeItem.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${activeItem.slug}/${sub.slug}`}
                        className="p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors flex-shrink-0"
                      >
                        <div className="text-sm news-title-sm text-nowrap text-foreground group-hover:text-[#f0a500]">
                          {sub.name}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 news-title-sm text-xs text-muted-foreground italic">
                      No subcategories
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          {/* Right shadow indicator */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-[#1a1f2e] to-transparent" />
        </div>
      </nav>
    </header>
  );
};
