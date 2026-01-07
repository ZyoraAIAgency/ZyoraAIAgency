import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, Cog, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analyze",
    description:
      "We dive deep into your business, identify bottlenecks, and map opportunities for automation.",
  },
  {
    number: "02",
    icon: Cog,
    title: "Build",
    description:
      "We architect and deploy custom AI automation systems tailored to your exact needs.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Scale",
    description:
      "We continuously optimize and scale your systems as your business grows.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 backdrop-blur-sm mb-6">
            <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase font-medium">
              Our Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
            <span className="text-foreground">Simple.</span>{" "}
            <span className="gradient-text">Systematic.</span>{" "}
            <span className="text-foreground">Scalable.</span>
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-border via-border to-transparent" />
                )}

                <div className="relative glass-panel rounded-3xl p-8 text-center">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-background border border-border rounded-full">
                    <span className="text-xs font-mono text-muted-foreground">
                      {step.number}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/60 border border-border/50 flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-medium text-foreground mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
