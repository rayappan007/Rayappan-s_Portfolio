import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiDownload, FiCode, FiMail } from "react-icons/fi";
import "./Hero.css";

const floatVariants = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Floating Background Shapes */}
      <div className="hero-bg-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`shape shape-${i + 1}`}
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="container hero-content">
        {/* Right: Profile Image */}
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="hero-image-ring"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-avatar"
            variants={floatVariants}
            animate="animate"
          >
            <img
              src={process.env.PUBLIC_URL + "/profile.jpg"}
              alt="Rayappan"
              className="profile-photo"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add("avatar-placeholder");
              }}
            />
            <div className="avatar-fallback">R</div>
          </motion.div>
          <div className="avatar-glow" />
          <div className="status-badge">
            <span className="status-dot" />
            Available for work
          </div>
        </motion.div>

        {/* Left: Text Content */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.span
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hello, I'm
          </motion.span>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Rayappan
          </motion.h1>

          <motion.div
            className="hero-titles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="type-prefix">I am a </span>
            <TypeAnimation
              sequence={[
                "Frontend Developer", 2000,
                "React JS Enthusiast", 2000,
                "CS Engineering Student", 2000,
                "UI/UX Problem Solver", 2000,
                "Open Source Learner", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typewriter"
            />
          </motion.div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            Building modern, performant web experiences with clean code and
            creative design. Passionate about turning ideas into elegant
            digital solutions.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="/resume.pdf"
              download
              className="btn btn-primary ripple-btn"
            >
              <FiDownload /> Download Resume
            </a>
            <button
              className="btn btn-outline ripple-btn"
              onClick={() => scrollTo("projects")}
            >
              <FiCode /> View Projects
            </button>
            <button
              className="btn btn-ghost ripple-btn"
              onClick={() => scrollTo("contact")}
            >
              <FiMail /> Contact Me
            </button>
          </motion.div>

          <motion.div
            className="hero-tech-stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {["React", "JavaScript", "Java", "Python", "MySQL"].map((t, i) => (
              <span key={t} className="tech-chip" style={{ animationDelay: `${i * 0.15}s` }}>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
