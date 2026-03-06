import { LayoutGrid } from "lucide-react";
import { motion } from "motion/react";
import type { Car } from "../backend.d";
import type { Category } from "../backend.d";
import { useAllCars, useCarsByCategory } from "../hooks/useQueries";
import { fallbackCars } from "../utils/carUtils";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";

interface CarsGridProps {
  activeCategory: string;
  onViewCar: (car: Car) => void;
  onCategoryChange: (cat: string) => void;
}

const tabs = [
  { id: "all", label: "All Models" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "electric", label: "Electric" },
  { id: "sports", label: "Sports" },
];

function useFilteredCars(category: string) {
  const isAll = category === "all";
  const allCarsQuery = useAllCars();
  const catQuery = useCarsByCategory(isAll ? "all" : (category as Category));

  if (isAll) {
    return allCarsQuery;
  }
  return catQuery;
}

export default function CarsGrid({
  activeCategory,
  onViewCar,
  onCategoryChange,
}: CarsGridProps) {
  const { data: cars, isLoading } = useFilteredCars(activeCategory);

  const displayCars =
    cars && cars.length > 0
      ? cars
      : fallbackCars.filter(
          (c) =>
            activeCategory === "all" ||
            (c.category as string) === activeCategory,
        );

  return (
    <section id="models" className="relative py-20 px-4">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.11 0.004 250), oklch(0.08 0.002 250))",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
            Our Collection
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl mt-2 text-foreground">
            All Models
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1 mb-10 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Car categories"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid="cars.tab"
              role="tab"
              aria-selected={activeCategory === tab.id}
              onClick={() => onCategoryChange(tab.id)}
              className={`relative whitespace-nowrap px-5 py-2.5 text-sm font-semibold rounded-sm transition-all ${
                activeCategory === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {!isLoading && displayCars.length > 0 && (
            <div className="ml-auto flex items-center gap-2 text-muted-foreground text-sm shrink-0">
              <LayoutGrid size={14} />
              <span>{displayCars.length} models</span>
            </div>
          )}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : displayCars.length === 0 ? (
          <motion.div
            data-ocid="cars.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="text-5xl mb-4 opacity-20">🚗</div>
            <h3 className="font-display font-bold text-xl text-muted-foreground mb-2">
              No models found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try selecting a different category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayCars.map((car, i) => (
              <CarCard
                key={String(car.id)}
                car={car}
                index={i + 1}
                onView={onViewCar}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
