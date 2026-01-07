import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AI automation and how can it help my business?",
    answer:
      "AI automation uses artificial intelligence to handle repetitive tasks, analyze data, and make intelligent decisions. For your business, this means faster lead response times, 24/7 customer engagement, reduced operational costs, and more time to focus on high-value activities that grow your revenue.",
  },
  {
    question: "How long does it take to implement an AI automation system?",
    answer:
      "Implementation timelines vary based on complexity. A basic automation setup can be live within 1-2 weeks, while comprehensive AI ecosystems typically take 4-8 weeks. We prioritize quick wins early so you start seeing value immediately.",
  },
  {
    question: "Do I need technical knowledge to use your AI systems?",
    answer:
      "Not at all. We design our systems to be user-friendly with intuitive dashboards and clear controls. We also provide comprehensive training and ongoing support to ensure your team can confidently manage the automation.",
  },
  {
    question: "What kind of ROI can I expect from AI automation?",
    answer:
      "Most clients see 3-5x ROI within the first 6 months. This comes from reduced labor costs, increased conversion rates, faster response times, and the ability to scale without proportionally increasing headcount.",
  },
  {
    question: "Can AI automation integrate with my existing tools and CRM?",
    answer:
      "Yes, our solutions are built to integrate seamlessly with popular platforms including Salesforce, HubSpot, Zapier, Slack, and hundreds of other tools. We ensure your AI ecosystem works harmoniously with your existing tech stack.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialize in working with startups, agencies, e-commerce brands, SaaS companies, and service-based businesses. Our solutions are particularly effective for businesses with high-volume lead generation, customer support, or sales processes.",
  },
];

export const FAQSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-foreground/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 backdrop-blur-sm mb-6">
            <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase font-medium">
              Common Questions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6">
            <span className="text-foreground">Frequently</span>{" "}
            <span className="gradient-text">Asked Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI automation services.
          </p>
        </AnimatedSection>

        {/* FAQ Accordion */}
        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-panel rounded-2xl border border-border/50 px-6 overflow-hidden group data-[state=open]:border-foreground/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium py-6 hover:no-underline group-hover:text-foreground/90 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
};
