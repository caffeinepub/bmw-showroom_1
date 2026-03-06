import { Button } from "@/components/ui/button";
import { Gauge, Rocket, Tag, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Car } from "../backend.d";
import {
  formatPrice,
  getCarImage,
  getCategoryBadgeClass,
  getCategoryLabel,
} from "../utils/carUtils";

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

export default function CarDetailModal({
  car,
  isOpen,
  onClose,
  onBook,
}: CarDetailModalProps) {
  if (!car) return null;

  const image = getCarImage(car);
  const badgeClass = getCategoryBadgeClass(car.category);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            data-ocid="car_detail.dialog"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-50 max-w-4xl mx-auto my-auto max-h-[90vh] overflow-y-auto rounded-sm bg-card border border-border shadow-bmw-lg flex flex-col"
          >
            {/* Full-width hero image */}
            <div className="relative aspect-[16/7] sm:aspect-[21/9] shrink-0 overflow-hidden">
              <img
                src={image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

              {/* Close button */}
              <button
                type="button"
                data-ocid="car_detail.close_button"
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-sm glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Overlaid title */}
              <div className="absolute bottom-0 left-0 p-6">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-sm ${badgeClass} mb-2 inline-block`}
                >
                  {getCategoryLabel(car.category)}
                </span>
                {car.featured && (
                  <span className="ml-2 text-xs font-bold px-2.5 py-1 rounded-sm bg-primary/20 text-primary border border-primary/40 uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col gap-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground">
                    {car.name}
                  </h2>
                  <p className="text-muted-foreground mt-2 leading-relaxed max-w-xl">
                    {car.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider block">
                    Starting at
                  </span>
                  <span className="font-display font-black text-3xl text-foreground">
                    {formatPrice(car.price)}
                  </span>
                </div>
              </div>

              {/* Specs table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-sm bg-secondary/50 border border-border">
                {[
                  {
                    icon: Zap,
                    label: "Horsepower",
                    value: `${Number(car.horsepower)} HP`,
                    color: "oklch(0.72 0.15 252)",
                  },
                  {
                    icon: Rocket,
                    label: "0–60 mph",
                    value: car.acceleration,
                    color: "oklch(0.72 0.18 27)",
                  },
                  {
                    icon: Gauge,
                    label: "Top Speed",
                    value: `${Number(car.topSpeed)} mph`,
                    color: "oklch(0.78 0.18 195)",
                  },
                  {
                    icon: Tag,
                    label: "Category",
                    value: getCategoryLabel(car.category),
                    color: "oklch(0.72 0.15 140)",
                  },
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="flex flex-col items-center text-center gap-2"
                    >
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center"
                        style={{
                          background: `${spec.color.replace(")", " / 0.1)")}`,
                        }}
                      >
                        <Icon size={18} style={{ color: spec.color }} />
                      </div>
                      <span className="spec-value text-lg text-foreground font-bold">
                        {spec.value}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {spec.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  data-ocid="car_detail.primary_button"
                  onClick={onBook}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm h-12 text-base shadow-bmw-glow transition-all hover:scale-[1.02]"
                >
                  Book a Test Drive
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="flex-1 border-border bg-transparent text-foreground hover:bg-secondary rounded-sm h-12 text-base"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
