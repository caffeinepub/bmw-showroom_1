import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onBookTestDrive: () => void;
  onScrollToTestDrive?: () => void;
}

const categories = [
  { id: "all", label: "All Models" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "electric", label: "Electric" },
  { id: "sports", label: "Sports" },
];

export default function Navbar({
  activeCategory,
  onCategoryChange,
  onBookTestDrive,
  onScrollToTestDrive,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleCategoryClick = (catId: string) => {
    onCategoryChange(catId);
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById("models")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-bmw-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.link"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/assets/generated/bmw-logo-transparent.dim_300x300.png"
              alt="BMW"
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-black text-xl tracking-tight text-foreground">
              BMW
            </span>
          </button>

          {/* Desktop category tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                data-ocid="nav.link"
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                  activeCategory === cat.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}

            {/* Test Drive nav link — visually distinct */}
            <button
              type="button"
              data-ocid="nav.testdrive_link"
              onClick={() => {
                if (onScrollToTestDrive) onScrollToTestDrive();
                else
                  document
                    .getElementById("test-drive")
                    ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative ml-2 px-4 py-2 text-sm font-bold transition-all rounded-sm text-primary hover:text-primary/80 flex items-center gap-1.5"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                aria-hidden
              />
              Test Drive
            </button>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              data-ocid="nav.primary_button"
              onClick={onBookTestDrive}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 h-9 text-sm rounded-sm transition-all hover:shadow-bmw-glow"
            >
              Book Test Drive
            </Button>
            <button
              type="button"
              className="lg:hidden text-foreground p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-border"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  data-ocid="nav.link"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`text-left px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              {/* Test Drive mobile link */}
              <button
                type="button"
                data-ocid="nav.testdrive_link"
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(() => {
                    if (onScrollToTestDrive) onScrollToTestDrive();
                    else
                      document
                        .getElementById("test-drive")
                        ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-left px-4 py-3 rounded-sm text-sm font-bold text-primary bg-primary/5 border border-primary/20 flex items-center gap-2 transition-colors hover:bg-primary/10"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                  aria-hidden
                />
                Test Drive
              </button>

              <Button
                data-ocid="nav.primary_button"
                onClick={() => {
                  onBookTestDrive();
                  setMobileOpen(false);
                }}
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-sm"
              >
                Book Test Drive
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
