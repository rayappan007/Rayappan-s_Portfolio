import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import "./About.css";

const STATS = [
  { value: 3,  label: "Projects Completed", suffix: "+" },
  { value: 10, label: "Technologies Known",  suffix: "+" },
  { value: 2,  label: "Internships",         suffix: "" },
  { value: 2,  label: "Certifications",      suffix: "" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About Me</h2>
          <div className="divider" />
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-avatar-wrap">
              <img
                src={process.env.PUBLIC_URL + "/profile.jpg"}
                alt="Rayappan"
                className="about-avatar"
              />
              <div className="about-avatar-fallback">R</div>
              <div className="about-avatar-border" />
            </div>
          </motion.div>

          <motion.div
            className="about-info"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="about-name">
              Hi, I'm <span>Rayappan</span>
            </h3>

            <div className="about-edu-tag">
              🎓 B.E Computer Science & Engineering — P.S.R Engineering College, Sivakasi&nbsp;
              <span className="cgpa-badge">CGPA: 7.3</span>
            </div>

            <p className="about-bio">
              I'm a <strong>Computer Science Engineering student (2022–2026)</strong> with a strong
              foundation in programming and software development. Eager to learn and apply new
              technologies to develop efficient and innovative solutions.
            </p>
            <p className="about-bio">
              I specialize in <strong>React JS</strong> and love crafting performant, user-friendly
              interfaces. Seeking an entry-level position to contribute my technical skills and grow
              as a professional.
            </p>

            <div className="about-chips">
              {["React JS", "JavaScript", "Java", "HTML", "CSS", "Spring Tool Suite", "MySQL", "OpenCV", "YOLOv8"].map(
                (s) => <span key={s} className="chip">{s}</span>
              )}
            </div>

            <div className="soft-skills">
              <span className="soft-label">Soft Skills:</span>
              {["Leadership", "MultiTasking", "Time Management"].map((s) => (
                <span key={s} className="soft-chip">{s}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <div className="stat-value">
                {inView ? (
                  <CountUp end={stat.value} duration={2.2} delay={0.5} />
                ) : 0}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
