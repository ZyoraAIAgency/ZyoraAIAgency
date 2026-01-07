import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="glass-panel rounded-[2.5rem] p-12 md:p-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
              <span className="text-foreground">Let AI Run Your Systems</span>
              <br />
              <span className="gradient-text">While You Focus on Growth.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Book a free strategy call and discover how AI automation can
              transform your business in 30 days or less.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="group">
                  Let's Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
