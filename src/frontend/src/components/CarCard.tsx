import { ArrowRight, Gauge, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { Car } from "../backend.d";
import {
  formatPrice,
  getCarImage,
  getCategoryBadgeClass,
  getCategoryLabel,
} from "../utils/carUtils";

interface CarCardProps {
  car: Car;
  index: number;
  onView: (car: Car) => void;
}

export default function CarCard({ car, index, onView }: CarCardProps) {
  const image = getCarImage(car);
  const badgeClass = getCategoryBadgeClass(car.category as string);
  const ocid = `cars.item.${index}`;
  const buttonOcid = `cars.card.button.${index}`;

  return (
    <motion.article
      data-ocid={ocid}
      className="car-card group relative flex flex-col rounded-sm overflow-hidden bg-card border border-border cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onClick={() => onView(car)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="img-overlay absolute inset-0" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-sm ${badgeClass}`}
          style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          {getCategoryLabel(car.category as string)}
        </span>

        {/* Featured badge */}
        {car.featured && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-sm bg-primary/20 text-primary border border-primary/40 uppercase tracking-wider">
            Featured
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <button
            type="button"
            data-ocid={buttonOcid}
            onClick={(e) => {
              e.stopPropagation();
              onView(car);
            }}
            className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-sm text-sm flex items-center gap-2 shadow-bmw-glow translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground leading-tight">
            {car.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {car.description}
          </p>
        </div>

        {/* Specs row — larger numerals, premium horizontal bar */}
        <div
          className="grid grid-cols-3 rounded-sm overflow-hidden"
          style={{
            background: "oklch(0.09 0.003 250 / 0.6)",
            border: "1px solid oklch(0.22 0.008 250)",
          }}
        >
          <div className="text-center py-3 px-2">
            <div className="flex items-baseline justify-center gap-1">
              <span className="spec-value text-base text-foreground leading-none">
                {Number(car.horsepower)}
              </span>
              <Zap size={10} className="text-primary mb-0.5" />
            </div>
            <span
              className="text-muted-foreground uppercase tracking-wider"
              style={{ fontSize: "0.6rem" }}
            >
              HP
            </span>
          </div>
          <div
            className="text-center py-3 px-2"
            style={{
              borderLeft: "1px solid oklch(0.22 0.008 250)",
              borderRight: "1px solid oklch(0.22 0.008 250)",
            }}
          >
            <div className="spec-value text-base text-foreground leading-none mb-0">
              {car.acceleration}
            </div>
            <span
              className="text-muted-foreground uppercase tracking-wider"
              style={{ fontSize: "0.6rem" }}
            >
              0–60
            </span>
          </div>
          <div className="text-center py-3 px-2">
            <div className="flex items-baseline justify-center gap-1">
              <span className="spec-value text-base text-foreground leading-none">
                {Number(car.topSpeed)}
              </span>
              <Gauge size={10} className="text-primary mb-0.5" />
            </div>
            <span
              className="text-muted-foreground uppercase tracking-wider"
              style={{ fontSize: "0.6rem" }}
            >
              MPH
            </span>
          </div>
        </div>

        {/* Price — full width, no competing link */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div>
            <span
              className="text-muted-foreground uppercase tracking-wider"
              style={{ fontSize: "0.6rem" }}
            >
              Starting at
            </span>
            <div className="font-display font-black text-xl text-foreground leading-tight">
              {formatPrice(car.price)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary opacity-60 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
