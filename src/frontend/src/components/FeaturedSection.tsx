import { motion } from "motion/react";
import type { Car } from "../backend.d";
import { useFeaturedCars } from "../hooks/useQueries";
import { fallbackCars } from "../utils/carUtils";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";

interface FeaturedSectionProps {
  onViewCar: (car: Car) => void;
}

export default function FeaturedSection({ onViewCar }: FeaturedSectionProps) {
  const { data: featuredCars, isLoading } = useFeaturedCars();

  const displayCars =
    featuredCars && featuredCars.length > 0
      ? featuredCars.slice(0, 3)
      : fallbackCars.filter((c) => c.featured).slice(0, 3);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Decorative corner element */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, oklch(0.52 0.18 252 / 0.08), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Editor's Choice
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl mt-2 text-foreground">
              Featured Models
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Handpicked selections representing the best of BMW engineering and
              design.
            </p>
          </div>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-border to-transparent hidden sm:block" />
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCars.map((car, i) => (
              <CarCard
                key={String(car.id)}
                car={car}
                index={i + 1}
                onView={onViewCar}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
