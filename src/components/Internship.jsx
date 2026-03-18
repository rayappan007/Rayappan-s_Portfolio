import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import "./Internship.css";

const EXPERIENCES = [
  {
    id: 1,
    company: "Let's Game Tech",
    role: "Fullstack Development Intern",
    period: "Nov 2025 – Dec 2025",
    location: "Coimbatore, India",
    description: [
      "Designed user-centered interfaces and improved overall user experience.",
      "Contributed to responsive layouts for web and CMS-based projects.",
      "Built reusable frontend UI components using modern web technologies.",
    ],
    color: "#38bdf8",
  },
  {
    id: 2,
    company: "Anjana Info Tech",
    role: "Web Development Intern",
    period: "May 2024 – Jun 2024",
    location: "Rajapalayam, India",
    description: [
      "Developed responsive web pages using HTML, CSS, and JavaScript.",
      "Assisted in backend integration with MySQL database.",
      "Improved UI consistency and contributed to feature enhancements.",
    ],
    color: "#818cf8",
  },
];

export default function Internship() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">Internship Experience</h2>
          <div className="divider" />
        </motion.div>

        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
            >
              <div className="timeline-dot" style={{ background: exp.color }} />
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company">
                      <FiBriefcase /> {exp.company}
                    </div>
                  </div>
                  <div className="timeline-meta">
                    <span><FiCalendar /> {exp.period}</span>
                    <span><FiMapPin /> {exp.location}</span>
                  </div>
                </div>
                <ul className="timeline-bullets">
                  {exp.description.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
