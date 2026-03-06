import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/bmw-hero.dim_1600x900.jpg"
          alt="BMW Showroom"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
        {/* Animated radial spotlight */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.52 0.18 252 / 0.15), transparent 70%)",
          }}
        />
      </div>

      {/* Decorative side stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* BMW Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <img
            src="/assets/generated/bmw-logo-transparent.dim_300x300.png"
            alt="BMW"
            className="h-24 w-24 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Tagline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
            BMW Showroom
          </span>
          <span className="h-px w-8 bg-primary" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-black hero-text-shadow"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="text-foreground">The Ultimate</span>
          <br />
          <span className="gradient-text-bmw">Driving Machine.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body"
        >
          Experience the pinnacle of automotive engineering. Precision-crafted
          performance meets uncompromising luxury.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            data-ocid="hero.primary_button"
            onClick={onExplore}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-12 text-base rounded-sm shadow-bmw-glow transition-all hover:scale-105 hover:shadow-bmw-glow"
          >
            Explore Models
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onExplore}
            className="border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50 font-semibold px-8 h-12 text-base rounded-sm transition-all"
          >
            View All Vehicles
          </Button>
        </motion.div>

        {/* Stats panel — full-bleed cinematic bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-14 relative"
        >
          {/* Thin top rule */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-6" />
          <div
            className="grid grid-cols-3"
            style={{
              background: "oklch(0.09 0.003 250 / 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(0.28 0.01 250 / 0.5)",
              borderRadius: "2px",
            }}
          >
            {[
              { value: "625", unit: "HP", label: "Peak Power" },
              { value: "3.2", unit: "s", label: "0–60 mph" },
              { value: "200", unit: "mph", label: "Top Speed" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-5 px-4 relative"
                style={
                  i > 0
                    ? { borderLeft: "1px solid oklch(0.28 0.01 250 / 0.5)" }
                    : {}
                }
              >
                {/* Large numeral */}
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="spec-value text-foreground"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-primary font-bold text-sm tracking-wider">
                    {stat.unit}
                  </span>
                </div>
                <span
                  className="text-muted-foreground mt-1.5 uppercase tracking-[0.18em]"
                  style={{ fontSize: "0.65rem" }}
                >
                  {stat.label}
                </span>
                {/* Bottom accent line on hover (decorative) */}
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.52 0.18 252 / 0.5), transparent)",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Thin bottom rule */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-6" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={onExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
        aria-label="Scroll to explore"
      >
        <span className="text-xs tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
