import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaJava, FaReact, FaHtml5, FaCss3Alt, FaDatabase,
} from "react-icons/fa";
import {
  SiJavascript, SiMysql, SiSpringboot,
} from "react-icons/si";
import { FiCode } from "react-icons/fi";
import "./Skills.css";

const SKILLS = [
  { name: "Java", icon: <FaJava />, level: 80, category: "Programming" },
  { name: "JavaScript", icon: <SiJavascript />, level: 85, category: "Programming" },
  { name: "React JS", icon: <FaReact />, level: 88, category: "Technologies" },
  { name: "HTML5", icon: <FaHtml5 />, level: 92, category: "Web Development" },
  { name: "CSS3", icon: <FaCss3Alt />, level: 88, category: "Web Development" },
  { name: "Responsive Design", icon: <FiCode />, level: 85, category: "Web Development" },
  { name: "Spring Tool Suite", icon: <SiSpringboot />, level: 65, category: "Technologies" },
  { name: "MySQL", icon: <SiMysql />, level: 75, category: "Technologies" },
  { name: "Database Design", icon: <FaDatabase />, level: 70, category: "Technologies" },
];

const CATEGORIES = ["All", "Programming", "Web Development", "Technologies"];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I Know</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="divider" />
          <p className="section-subtitle">
            A toolkit of languages, frameworks, and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="category-filters"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="skill-icon">{skill.icon}</div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-category-tag">{skill.category}</div>
      <div className="skill-bar-wrap">
        <div className="skill-bar">
          <motion.div
            className="skill-bar-fill"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.07, ease: "easeOut" }}
          />
        </div>
        <span className="skill-level">{skill.level}%</span>
      </div>
    </motion.div>
  );
}
