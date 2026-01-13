import { Facebook, Twitter, Instagram, Linkedin, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/Components/ThemeProvider";
import { PantamiLogoCompact } from "@/Components/PantamiLogo";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

// Navigation items - will be populated from categories
interface NavItem {
  label: string;
  href: string;
  slug?: string;
}

const staticNavItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "CATEGORIES", href: "/categories" },
];

interface HeaderProps {
  categories?: Array<{ id: number; name: string; slug: string; posts_count?: number }>;
}

export const Header: React.FC<HeaderProps> = ({ categories = [] }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  // Create navigation items from categories
  const navItems: NavItem[] = [
    ...staticNavItems,
    ...categories.slice(0, 8).map(cat => ({
      label: cat.name.toUpperCase(),
      href: `/category/${cat.slug}`,
      slug: cat.slug
    }))
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.get(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-background border-b-2 border-[#f0a500] sticky top-0 z-50 shadow-sm">
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
          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-start">
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
      <nav className="bg-[#f0a500] border-t-2 border-[#d99200]">
        <div className="container">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm font-bold text-white hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/e-paper"
              className="px-6 py-2 bg-[#1a1f2e] text-white rounded font-semibold text-sm hover:bg-[#2d3748] transition-colors whitespace-nowrap"
            >
              e-Paper
            </Link>
          </div>

          {/* Mobile Navigation - Horizontal Scrollable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max py-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-xs font-bold text-white hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide rounded"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/e-paper"
                className="px-4 py-2 bg-[#1a1f2e] text-white rounded font-semibold text-xs hover:bg-[#2d3748] transition-colors whitespace-nowrap ml-2"
              >
                e-Paper
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
