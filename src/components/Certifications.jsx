import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiAward, FiCalendar, FiExternalLink } from "react-icons/fi";
import "./Certifications.css";

const CERTS = [
  {
    id: 1,
    title: "15-Day MasterClass in FullStack Development",
    issuer: "FullStack Academy",
    date: "2024",
    icon: "🚀",
    color: "#38bdf8",
  },
  {
    id: 2,
    title: "15-Day MasterClass in HTML and CSS",
    issuer: "Web Dev Bootcamp",
    date: "2024",
    icon: "🎨",
    color: "#818cf8",
  },
];

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="certifications" className="section certs-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Credentials</span>
          <h2 className="section-title">Certifications</h2>
          <div className="divider" />
        </motion.div>

        <div className="certs-grid">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="flip-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flip-inner">
                {/* Front */}
                <div className="flip-front">
                  <div className="cert-icon" style={{ color: cert.color }}>
                    {cert.icon}
                  </div>
                  <FiAward className="cert-award-icon" style={{ color: cert.color }} />
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer}</span>
                  <div className="cert-date">
                    <FiCalendar /> {cert.date}
                  </div>
                  <div className="flip-hint">Hover to flip ↻</div>
                </div>
                {/* Back */}
                <div className="flip-back" style={{ borderColor: cert.color }}>
                  <div className="cert-icon large">{cert.icon}</div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-back-text">
                    Completed an intensive hands-on training program covering modern
                    web development technologies and best practices.
                  </p>
                  <button className="cert-view-btn" style={{ background: cert.color }}>
                    <FiExternalLink /> View Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
