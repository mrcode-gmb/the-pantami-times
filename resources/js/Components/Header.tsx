import { Facebook, Twitter, Instagram, Linkedin, Search, Menu, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo__Copy_-removebg-preview.png";
import { useState } from "react";
import { useTheme } from "@/Components/ThemeProvider";

const navItems = [
  { label: "NEWS", href: "#" },
  { label: "METRO", href: "#" },
  { label: "SPORT", href: "#" },
  { label: "LIFE", href: "#" },
  { label: "TECH", href: "#" },
  { label: "GTV", href: "#" },
  { label: "OPINION", href: "#" },
  { label: "WOMAN", href: "#" },
  { label: "REVIEWED", href: "#" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Facebook className="social-icon" size={18} />
            <Twitter className="social-icon" size={18} />
            <Instagram className="social-icon" size={18} />
            <Linkedin className="social-icon" size={18} />
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center items-center gap-2 md:gap-4">
            <img 
              src={logo} 
              alt="The Pantami Times" 
              className="h-16 md:h-16 lg:h-16 object-contain"
            />
            <h1 className="text-2xl font-bold">The <span className="text-primary">Pantami</span> Times</h1>
          </div>

          {/* Search & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <Search className="social-icon" size={20} />
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border bg-background">
        <div className="container">
          <div className="hidden md:flex items-center justify-between py-3">
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-muted rounded transition-colors">
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-6 ml-4">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="nav-link">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <button className="epaper-btn">
              e-Paper
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a 
                    key={item.label} 
                    href={item.href} 
                    className="nav-link py-2 px-4 hover:bg-muted rounded"
                  >
                    {item.label}
                  </a>
                ))}
                <button className="epaper-btn mx-4 mt-2">
                  e-Paper
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
