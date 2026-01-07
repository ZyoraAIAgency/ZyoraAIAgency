import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Zap,
  Globe,
  Mail,
  Phone,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Zap,
    title: "AI Automation for Sales & Leads",
    description:
      "Automate lead qualification, nurturing, and conversion with intelligent AI workflows that work 24/7.",
  },
  {
    icon: Globe,
    title: "Website & Funnel Optimization",
    description:
      "High-converting landing pages and sales funnels built for performance and scale.",
  },
  {
    icon: Mail,
    title: "Email & CRM Automation",
    description:
      "Seamless email sequences and CRM integrations that nurture leads while you sleep.",
  },
  {
    icon: Phone,
    title: "AI Call Handling & Follow-ups",
    description:
      "Never miss a lead with AI-powered call routing, transcription, and automated follow-ups.",
  },
  {
    icon: Layers,
    title: "Full AI Ecosystem for Brands",
    description:
      "Complete end-to-end AI infrastructure that connects every touchpoint of your business.",
  },
];

export const ServicesSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 backdrop-blur-sm mb-6">
            <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase font-medium">
              What We Build
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
            <span className="gradient-text">AI Systems,</span>{" "}
            <span className="text-foreground">Not Just Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just implement tools—we architect intelligent automation
            ecosystems that transform how your business operates.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="service-card h-full group"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center mb-6 group-hover:border-foreground/20 transition-colors">
                    <service.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}

          {/* CTA Card */}
          <AnimatedSection delay={0.5}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="service-card h-full flex flex-col justify-center items-center text-center group bg-secondary/20"
            >
              <h3 className="text-xl font-medium text-foreground mb-3 tracking-tight">
                Ready to Scale?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Let's build your custom AI automation system.
              </p>
              <Button variant="hero" size="default" asChild>
                <Link to="/services" className="group">
                  View All Services
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
