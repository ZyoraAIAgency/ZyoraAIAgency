import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const stats = [
  { value: "50+", label: "Brands Automated" },
  { value: "10M+", label: "Leads Processed" },
  { value: "40%", label: "Avg. Conversion Boost" },
  { value: "24/7", label: "AI Uptime" },
];

export const SocialProofSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Trust Badge */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase">
            Trusted by Modern Brands & Startups
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonial Placeholder */}
        <AnimatedSection delay={0.4} className="mt-20">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-panel rounded-3xl p-12 text-center max-w-3xl mx-auto"
          >
            <div className="text-muted-foreground/30 text-5xl font-serif mb-6">
              "
            </div>
            <p className="text-xl md:text-2xl text-foreground font-medium tracking-tight leading-relaxed mb-8">
              Zyora transformed our lead pipeline completely. What used to take
              our team 30 hours a week now runs automatically with better
              results.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/60 border border-border/50 flex items-center justify-center">
                <span className="text-foreground font-medium">JD</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">
                  James Davis
                </p>
                <p className="text-xs text-muted-foreground">
                  Founder, TechScale Inc
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
