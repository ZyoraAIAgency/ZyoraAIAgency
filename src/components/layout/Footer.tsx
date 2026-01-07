import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import zyoraLogo from "@/assets/zyora-logo.png";
const linkVariants = {
  hover: {
    x: 4,
    transition: {
      duration: 0.2
    }
  }
};
export const Footer = () => {
  return <footer className="border-t border-border/50 bg-background relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <motion.div whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              duration: 0.3
            }} className="w-10 h-10 overflow-hidden rounded-xl">
                <img alt="Zyora" className="w-full h-full object-cover" src="/lovable-uploads/71ce6875-6ee4-4eab-8bbe-8b46ba20d286.png" />
              </motion.div>
              <span className="font-semibold tracking-tight text-foreground text-xl group-hover:text-foreground/80 transition-colors">
                Zyora AI Agency
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              We build AI systems that scale brands. Enterprise-grade automation
              for modern businesses ready to grow.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <h4 className="text-sm font-medium text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "Services", "About", "Contact"].map((link, index) => <motion.li key={link} initial={{
              opacity: 0,
              x: -10
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.1 * index
            }}>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block">
                      {link}
                    </Link>
                  </motion.div>
                </motion.li>)}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <h4 className="text-sm font-medium text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <motion.li variants={linkVariants} whileHover="hover">
                <a href="mailto:ZyoraAIAgency@outlook.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block">
                  ZyoraAIAgency@outlook.com
                </a>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block">
                  Book a Call
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zyora AI Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <motion.div whileHover={{
            scale: 1.05
          }}>
              <Link to="/privacy" className="hover:text-foreground transition-colors link-underline">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{
            scale: 1.05
          }}>
              <Link to="/terms" className="hover:text-foreground transition-colors link-underline">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>;
};