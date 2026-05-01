"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiloLogoFull } from "@/components/brand/FiloLogo";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluzioni", href: "#products" },
    { name: "Come funziona", href: "#how-it-works" },
    { name: "Perché Filò", href: "#why-filo" },
  ];

  const scrollToContact = (location: string) => {
    trackEvent("cta_click", {
      location,
      label: "book_session",
      path: window.location.pathname,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Filò - Home">
          <FiloLogoFull size={26} />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#B5B5BE] hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button
            variant="premium"
            className="ml-4"
            onClick={() => scrollToContact("navbar")}
          >
            Richiedi una demo
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute top-full left-0 w-full glass-panel border-t border-white/5 py-5 px-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B5B5BE] hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="premium"
              className="w-full mt-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToContact("mobile_navbar");
              }}
            >
              Richiedi una demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
