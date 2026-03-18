import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useActiveSection } from "../hooks/useScrollProgress";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#hero", section: "hero" },
  { label: "About", href: "#about", section: "about" },
  { label: "Skills", href: "#skills", section: "skills" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Experience", href: "#experience", section: "experience" },
  { label: "Job Tracker", href: "/job-tracker", external: true },
  { label: "Contact", href: "#contact", section: "contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeSection = useActiveSection([
    "hero", "about", "skills", "projects", "experience", "contact"
  ]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          Ray
          <span className="logo-accent">appan</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        <ul className="nav-links desktop-links">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`nav-link ${location.pathname === link.href ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label}>
                <button
                  className={`nav-link ${activeSection === link.section && isHome ? "active" : ""}`}
                  onClick={() => isHome ? scrollTo(link.section) : null}
                >
                  {link.label}
                </button>
              </li>
            )
          )}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) =>
              link.external ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    className="mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    className="mobile-link"
                    onClick={() => scrollTo(link.section)}
                  >
                    {link.label}
                  </button>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
