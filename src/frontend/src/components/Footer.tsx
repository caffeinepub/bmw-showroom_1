import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const footerLinks = {
  Models: ["M Series", "7 Series", "X Series", "Electric (i)", "Sports"],
  Experience: [
    "Test Drive",
    "Configure Your BMW",
    "Certified Pre-Owned",
    "BMW Financial Services",
  ],
  Company: ["About BMW", "Innovation", "Sustainability", "Careers"],
  Support: [
    "Find a Dealer",
    "Service & Repair",
    "Owner's Manual",
    "Contact Us",
  ],
};

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiX, label: "X", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Subtle top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top section: logo + social */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/generated/bmw-logo-transparent.dim_300x300.png"
                alt="BMW"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display font-black text-2xl text-foreground tracking-tight">
                BMW
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              The Ultimate Driving Machine. Precision engineering meets
              uncompromising luxury since 1916.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-sm bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h4 className="text-foreground font-bold text-xs uppercase tracking-[0.15em] mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      data-ocid="nav.link"
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs text-center sm:text-left">
            © {year} BMW AG. All rights reserved. For demonstration purposes
            only.
          </p>
          <p className="text-muted-foreground text-xs text-center sm:text-right">
            Built with <span className="text-primary">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
