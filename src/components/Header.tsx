"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import AuthModal from "./AuthModal";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, cart } = useCartStore();
  const { customer } = useAuthStore();
  const itemCount = cart?.totalQuantity ?? 0;
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const glassClasses = scrolled
    ? "bg-[var(--glass-bg-heavy)] shadow-[0_4px_24px_rgba(19,70,134,0.06)]"
    : "bg-[var(--glass-bg)]";

  return (
    <>
      {/* ── Floating pill nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`
            pointer-events-auto flex items-center gap-6
            rounded-full border border-[var(--glass-border)] px-8 py-3
            backdrop-blur-[16px] transition-all duration-500
            ${glassClasses}
          `}
        >
          {/* Logo mark — replaces Home link, same height as icons */}
          <Link href="/" aria-label="Waves Company home" className="flex items-center shrink-0">
            <Image
              src="/logos/Transparent_Blue_Logo_Navbar.png"
              alt="Waves"
              width={32}
              height={32}
              className="h-[18px] w-auto"
              priority
            />
          </Link>

          {/* Divider after logo */}
          <div className="h-4 w-px bg-primary/15" />

          {/* Nav links - desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent" : "text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-4 w-px bg-primary/15 md:block" />

          {/* Account */}
          {customer ? (
            <Link href="/account" className="text-primary transition-colors hover:text-accent" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="text-primary transition-colors hover:text-accent" aria-label="Sign in">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* Cart */}
          <button type="button" onClick={openCart} className="relative text-primary transition-colors hover:text-accent" aria-label="Open cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex flex-col justify-center gap-1 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 bg-primary transition-all duration-300 ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </motion.nav>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--glass-bg-heavy)] backdrop-blur-[24px] md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-2xl font-medium text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
