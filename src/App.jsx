import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobTrackerPage from "./pages/JobTrackerPage";
import { useScrollProgress } from "./hooks/useScrollProgress";

import "./styles/global.css";

/* ── Custom Cursor ── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + "px";
        ring.current.style.top = e.clientY + "px";
      }
    };
    const hover = () => ring.current?.classList.add("hover");
    const unhover = () => ring.current?.classList.remove("hover");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", unhover);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

/* ── Loading Screen ── */
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-logo">&lt;Ray/&gt;</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </motion.div>
  );
}

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}

/* ── Back to Top ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const cb = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, []);

  if (!visible) return null;
  return (
    <motion.button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      title="Back to top"
      aria-label="Back to top"
    >
      ↑
    </motion.button>
  );
}

/* ── App Shell ── */
function AppShell({ theme, toggleTheme }) {
  const location = useLocation();
  const isJobTracker = location.pathname === "/job-tracker";

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/job-tracker" element={<JobTrackerPage />} />
          {/* Catch-all → home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>

      {!isJobTracker && <Footer />}
      <BackToTop />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <AppShell theme={theme} toggleTheme={toggleTheme} />
      )}
    </BrowserRouter>
  );
}
