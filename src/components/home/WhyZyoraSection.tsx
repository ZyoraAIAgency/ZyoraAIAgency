import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Target, Clock, Sparkles, Shield } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Built for Growth",
    description:
      "Every system we build is designed with scale in mind—from day one to IPO.",
  },
  {
    icon: Clock,
    title: "Time Liberation",
    description:
      "Reclaim 20+ hours per week by automating repetitive tasks that drain your team.",
  },
  {
    icon: Sparkles,
    title: "Revenue Acceleration",
    description:
      "Our clients see an average 40% increase in conversion rates within 90 days.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade",
    description:
      "Startup-speed execution with luxury attention to detail and security.",
  },
];

export const WhyZyoraSection = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 backdrop-blur-sm mb-6">
              <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase font-medium">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
              <span className="text-foreground">The Zyora</span>{" "}
              <span className="gradient-text">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're not just another automation agency. We're your strategic
              partner in building intelligent systems that compound over time.
            </p>

            {/* Quote Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel rounded-2xl p-8"
            >
              <div className="text-muted-foreground/30 text-4xl font-serif mb-4">
                "
              </div>
              <p className="text-xl text-foreground font-medium tracking-tight mb-4">
                Complexity should be hidden. Power should be felt.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Zyora Philosophy
                </span>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Right - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl p-6 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center mb-4">
                    <benefit.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
