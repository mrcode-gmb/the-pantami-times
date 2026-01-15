import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  sections: [
    { title: "News", links: ["National", "World", "Politics", "Business", "Technology"] },
    { title: "Life", links: ["Entertainment", "Fashion", "Food", "Travel", "Relationships"] },
    { title: "Sport", links: ["Football", "Basketball", "Tennis", "Athletics", "Boxing"] },
    { title: "Company", links: ["About Us", "Contact", "Advertise", "Careers", "Privacy Policy"] }
  ]
};

export const Footer = () => {
  return (
    <footer className="bg-PantamiTimes-navy text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo & Social */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold mb-2">
              Pantami<span className="text-primary"> Times</span>
            </h2>
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
          {footerLinks.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-primary-foreground/60 text-sm hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
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
              <h3 className="font-semibold mb-1">Subscribe to our Newsletter</h3>
              <p className="text-primary-foreground/60 text-sm">
                Get the latest news delivered to your inbox
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary"
              />
              <button className="epaper-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2026 The PantamiTimes Nigeria. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
