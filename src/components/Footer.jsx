import React from "react";
import { FiGithub, FiLinkedin, FiHeart } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Wave SVG */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z"
            fill="var(--bg-card)"
          />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          Ray<span className="logo-accent">appan</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <p className="footer-text">
          © 2026 Rayappan Portfolio — Built with{" "}
          <FiHeart className="heart-icon" /> and React JS
        </p>

        <div className="footer-links">
          <a
            href="https://github.com/rayappan"
            target="_blank"
            rel="noreferrer"
            className="footer-icon-link"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/rayappan"
            target="_blank"
            rel="noreferrer"
            className="footer-icon-link"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
