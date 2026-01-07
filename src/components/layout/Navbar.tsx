import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import zyoraLogo from "@/assets/zyora-logo.png";
const navLinks = [{
  name: "Home",
  href: "/"
}, {
  name: "Services",
  href: "/services"
}, {
  name: "About",
  href: "/about"
}, {
  name: "Blog",
  href: "/blog"
}, {
  name: "Contact",
  href: "/contact"
}];
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  return <>
      <motion.nav initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }} className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
              <img alt="Zyora" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src="/lovable-uploads/faa122e0-dc60-4f0d-96bb-5b1bbddf340c.png" />
            </div>
            <span className="font-semibold tracking-tight text-foreground text-lg">
              Zyora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => <motion.div key={link.name} initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1 * index,
            duration: 0.4
          }}>
                <Link to={link.href} className={`relative text-sm font-medium transition-colors duration-300 link-underline ${location.pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {link.name}
                </Link>
              </motion.div>)}
          </div>

          {/* CTA Button */}
          <motion.div className="hidden md:block" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.4,
          duration: 0.4
        }}>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} transition={{
            duration: 0.2
          }}>
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact">Book a Call</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl pt-20 px-6 md:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => <motion.div key={link.name} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: i * 0.1
          }}>
                  <Link to={link.href} className={`text-2xl font-medium ${location.pathname === link.href ? "text-foreground" : "text-muted-foreground"}`}>
                    {link.name}
                  </Link>
                </motion.div>)}
              <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.4
          }} className="pt-4">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact">Book a Strategy Call</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};