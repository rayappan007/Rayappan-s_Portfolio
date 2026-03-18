import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiX, FiSearch } from "react-icons/fi";
import projectsData from "../data/projectsData";
import "./Projects.css";

const ALL_TECHS = ["All", ...new Set(projectsData.flatMap((p) => p.tech))];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = projectsData.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.tech.includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What I've Built</span>
          <h2 className="section-title">Projects</h2>
          <div className="divider" />
        </motion.div>

        {/* Controls */}
        <motion.div
          className="projects-controls"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="search-wrap">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="tech-filters">
            {ALL_TECHS.slice(0, 6).map((t) => (
              <button
                key={t}
                className={`filter-btn ${filter === t ? "active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="project-img">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-img-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                )}
                {project.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.shortDesc}</p>
                <div className="tech-badges">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <button
                    className="btn-action primary"
                    onClick={() => setSelected(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>
                <FiX />
              </button>
              <h2 className="modal-title">{selected.title}</h2>
              <div className="tech-badges modal-techs">
                {selected.tech.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
              <p className="modal-desc">{selected.fullDesc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
