import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiBriefcase } from "react-icons/fi";
import "./JobTracker.css";

const STATUS_CONFIG = {
  Applied:   { color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  Interview: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Offer:     { color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  Rejected:  { color: "#f43f5e", bg: "rgba(244,63,94,0.12)" },
};

const STATUSES = Object.keys(STATUS_CONFIG);
const PIE_COLORS = STATUSES.map((s) => STATUS_CONFIG[s].color);

const DEFAULT_FORM = {
  company: "",
  role: "",
  link: "",
  date: new Date().toISOString().slice(0, 10),
  status: "Applied",
};

function loadJobs() {
  try { return JSON.parse(localStorage.getItem("rayappan_jobs") || "[]"); }
  catch { return []; }
}

export default function JobTracker() {
  const [jobs, setJobs] = useState(loadJobs);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("rayappan_jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.role) return;
    if (editId !== null) {
      setJobs(jobs.map((j) => (j.id === editId ? { ...form, id: editId } : j)));
      setEditId(null);
    } else {
      setJobs([{ ...form, id: Date.now() }, ...jobs]);
    }
    setForm(DEFAULT_FORM);
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setForm({ company: job.company, role: job.role, link: job.link || "", date: job.date, status: job.status });
    setEditId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setJobs(jobs.filter((j) => j.id !== id));

  const handleStatusChange = (id, status) =>
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));

  const stats = STATUSES.map((s) => ({
    name: s,
    value: jobs.filter((j) => j.status === s).length,
  }));

  const filtered = filterStatus === "All"
    ? jobs
    : jobs.filter((j) => j.status === filterStatus);

  return (
    <div className="job-tracker-page">
      {/* Header */}
      <motion.div
        className="jt-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <span className="section-tag">Career Hub</span>
          <h1 className="jt-title">Job Application Tracker</h1>
          <p className="jt-subtitle">Track every application. Land your dream role.</p>
        </div>
        <button
          className="btn-add"
          onClick={() => { setShowForm(true); setEditId(null); setForm(DEFAULT_FORM); }}
        >
          <FiPlus /> Add Application
        </button>
      </motion.div>

      {/* Stat Cards */}
      <div className="jt-stats">
        {[
          { label: "Total", value: jobs.length, color: "#94a3b8" },
          ...stats,
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="jt-stat-card"
            style={{ borderColor: s.color + "44" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: `0 8px 30px ${s.color}22` }}
          >
            <div className="jt-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="jt-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      {jobs.length > 0 && (
        <motion.div
          className="jt-charts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-card">
            <h3 className="chart-title">Applications by Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats} barSize={40}>
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }}
                  cursor={{ fill: "rgba(56,189,248,0.05)" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {stats.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={stats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                  {stats.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, color: "#e2e8f0", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="jt-filters">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            className={`filter-btn ${filterStatus === s ? "active" : ""}`}
            onClick={() => setFilterStatus(s)}
            style={filterStatus === s && s !== "All"
              ? { background: STATUS_CONFIG[s]?.color, color: "#020617", borderColor: STATUS_CONFIG[s]?.color }
              : {}}
          >
            {s}
            {s !== "All" && (
              <span className="filter-count">{jobs.filter((j) => j.status === s).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Table / Empty */}
      {filtered.length === 0 ? (
        <motion.div
          className="jt-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FiBriefcase />
          <p>No applications yet. Click "Add Application" to get started!</p>
        </motion.div>
      ) : (
        <div className="jt-table-wrap">
          <table className="jt-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((job) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <td>
                      {job.link
                        ? <a href={job.link} target="_blank" rel="noreferrer" className="jt-link">{job.company}</a>
                        : <span className="jt-company-name">{job.company}</span>
                      }
                    </td>
                    <td>{job.role}</td>
                    <td className="jt-date">{job.date}</td>
                    <td>
                      <select
                        className="status-select"
                        value={job.status}
                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                        style={{
                          color: STATUS_CONFIG[job.status]?.color,
                          background: STATUS_CONFIG[job.status]?.bg,
                          borderColor: STATUS_CONFIG[job.status]?.color + "55",
                        }}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="jt-actions">
                        <button className="jt-btn edit" onClick={() => handleEdit(job)} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button className="jt-btn delete" onClick={() => handleDelete(job.id)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="jt-form-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="jt-form-header">
                <h2>{editId !== null ? "Edit Application" : "Add Application"}</h2>
                <button className="modal-close-btn" onClick={() => setShowForm(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="jt-form">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" required />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" required />
                </div>
                <div className="form-group">
                  <label>Job Link</label>
                  <input name="link" value={form.link} onChange={handleChange} placeholder="https://..." type="url" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date Applied</label>
                    <input name="date" value={form.date} onChange={handleChange} type="date" />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-submit">
                  {editId !== null ? "Update Application" : "Add Application"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
