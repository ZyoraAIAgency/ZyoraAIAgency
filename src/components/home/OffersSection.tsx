import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const offers = [
  {
    name: "Zyora Core",
    tagline: "Starter Automation",
    description: "Essential AI automation for businesses ready to begin their automation journey.",
    features: [
      "Initial business audit",
      "1 core automation workflow",
      "Basic CRM integration",
      "30-day support",
    ],
  },
  {
    name: "Zyora Scale",
    tagline: "Connected Systems",
    description: "Comprehensive automation ecosystem for growing businesses ready to scale.",
    features: [
      "Full systems analysis",
      "Multiple connected workflows",
      "Advanced integrations",
      "AI-powered analytics",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Zyora Elite",
    tagline: "Full AI Automation",
    description: "Enterprise-grade AI infrastructure with dedicated support and optimization.",
    features: [
      "Complete AI ecosystem",
      "Custom AI model training",
      "Dedicated success manager",
      "24/7 priority support",
      "Quarterly optimization",
    ],
  },
];

export const OffersSection = () => {
  return (
    <section className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 backdrop-blur-sm mb-6">
            <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase font-medium">
              Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
            <span className="text-foreground">Choose Your</span>{" "}
            <span className="gradient-text">Growth Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every business is unique. We offer flexible solutions designed to
            meet you where you are and scale where you're going.
          </p>
        </AnimatedSection>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <AnimatedSection key={offer.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-8 h-full flex flex-col ${
                  offer.featured
                    ? "bg-foreground text-primary-foreground"
                    : "glass-panel"
                }`}
              >
                {offer.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background text-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className={`text-xs tracking-[0.15em] uppercase font-medium mb-2 ${
                      offer.featured
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {offer.tagline}
                  </p>
                  <h3
                    className={`text-2xl font-semibold tracking-tight mb-3 ${
                      offer.featured ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {offer.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      offer.featured
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {offer.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          offer.featured
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          offer.featured
                            ? "text-primary-foreground/90"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={offer.featured ? "secondary" : "hero"}
                  size="lg"
                  className={`w-full ${
                    offer.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : ""
                  }`}
                  asChild
                >
                  <Link to="/contact" className="group">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
