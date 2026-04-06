import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "Corrections Policy", href: "/corrections" },
      { label: "Writing Tips", href: "/writing-tips" },
      { label: "e-Paper", href: "/e-paper" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-PantamiTimes-navy text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Social */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold mb-2">
                Pantami<span className="text-primary"> Times</span>
              </h2>
            </Link>
            <p className="text-primary-foreground/60 text-sm mb-6">
              Conscience, Nurtured by Truth
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
              </a>
              <a 
                href="https://twitter.com/PantamiTimes" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
              </a>
              <a 
                href="https://www.instagram.com/PantamiTimes" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
              </a>
              <a 
                href="https://www.linkedin.com/company/PantamiTimes" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
              </a>
              <a 
                href="https://www.youtube.com/@PantamiTimes" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/60 text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold mb-1">Need Help or Want to Reach Us?</h3>
              <p className="text-primary-foreground/60 text-sm">
                Contact the Pantami Times team, review our guidelines, or browse the digital edition.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
              <Link href="/contact" className="epaper-btn text-center">
                Contact Us
              </Link>
              <Link
                href="/guidelines"
                className="rounded border border-primary-foreground/20 px-4 py-2 text-center text-sm font-medium text-primary-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                Read Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2026 Pantami Times. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/corrections" className="hover:text-primary transition-colors">Corrections</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
