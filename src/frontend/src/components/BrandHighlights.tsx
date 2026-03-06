import { Gem, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: Trophy,
    title: "BMW M Performance",
    description:
      "Born on the track, perfected for the road. M Performance technology delivers unmatched power and precision in every drive.",
    color: "oklch(0.72 0.18 27)",
    bgColor: "oklch(0.52 0.22 27 / 0.07)",
    borderColor: "oklch(0.52 0.22 27 / 0.2)",
    featured: false,
  },
  {
    icon: Zap,
    title: "Electric Mobility",
    description:
      "The future is electric. BMW's iX and i-series combine zero-emission driving with the luxury and performance you expect.",
    color: "oklch(0.95 0.02 250)",
    bgColor: "oklch(0.52 0.18 252 / 0.18)",
    borderColor: "oklch(0.52 0.18 252 / 0.55)",
    featured: true,
  },
  {
    icon: Gem,
    title: "Luxury Craftsmanship",
    description:
      "Every detail is intentional. Hand-stitched interiors, premium materials, and meticulous attention to craft define the BMW experience.",
    color: "oklch(0.72 0.15 252)",
    bgColor: "oklch(0.52 0.18 252 / 0.07)",
    borderColor: "oklch(0.52 0.18 252 / 0.2)",
    featured: false,
  },
];

export default function BrandHighlights() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, oklch(0.52 0.18 252 / 0.05), transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
            Why BMW
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl mt-3 text-foreground">
            Engineered for Excellence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative overflow-hidden group"
                style={{
                  background: item.bgColor,
                  border: `1px solid ${item.borderColor}`,
                  borderRadius: "2px",
                  padding: item.featured ? "2.5rem" : "2rem",
                  /* Featured card sits slightly elevated */
                  boxShadow: item.featured
                    ? "0 0 60px oklch(0.52 0.18 252 / 0.18), 0 0 0 1px oklch(0.52 0.18 252 / 0.3)"
                    : "none",
                }}
              >
                {/* Featured: full blue mesh background */}
                {item.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 120% 80% at 60% 40%, oklch(0.52 0.18 252 / 0.12), transparent 70%)",
                    }}
                  />
                )}

                {/* Hover glow for non-featured */}
                {!item.featured && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${item.bgColor}, transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center mb-6"
                    style={{
                      width: item.featured ? "3.5rem" : "3rem",
                      height: item.featured ? "3.5rem" : "3rem",
                      background: item.featured
                        ? "oklch(0.52 0.18 252 / 0.25)"
                        : item.bgColor,
                      border: `1px solid ${item.borderColor}`,
                      borderRadius: "2px",
                    }}
                  >
                    <Icon
                      size={item.featured ? 26 : 20}
                      style={{ color: item.color }}
                    />
                  </div>

                  {/* Featured label */}
                  {item.featured && (
                    <div className="mb-3">
                      <span
                        className="text-primary font-bold uppercase tracking-[0.2em]"
                        style={{ fontSize: "0.65rem" }}
                      >
                        The BMW Vision
                      </span>
                    </div>
                  )}

                  <h3
                    className="font-display font-bold mb-3"
                    style={{
                      color: item.color,
                      fontSize: item.featured ? "1.25rem" : "1rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: item.featured
                        ? "oklch(0.75 0.008 250)"
                        : "oklch(0.55 0.01 250)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Featured bottom accent */}
                  {item.featured && (
                    <div
                      className="mt-6 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.52 0.18 252 / 0.8), transparent)",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
