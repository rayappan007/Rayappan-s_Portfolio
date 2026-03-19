import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from "react-icons/fi";
import "./Contact.css";

const SOCIALS = [
  { icon: <FiMail />,     label: "Email",    value: "rayappanr76@gmail.com",        href: "mailto:rayappanr76@gmail.com" },
  { icon: <FiPhone />,    label: "Phone",    value: "+91 7904461809",               href: "tel:+917904461809" },
  { icon: <FiMapPin />,   label: "Location", value: "Tuticorin, Tamil Nadu, India", href: "#" },
  { icon: <FiGithub />,   label: "GitHub",   value: "github.com/rayappan",          href: "https://github.com/rayappan007" },
  { icon: <FiLinkedin />, label: "LinkedIn", value: "linkedin.com/in/rayappan",     href: "https://www.linkedin.com/in/rayappan-m-17735334b/" },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:rayappanr76@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="contact-info-title">Let's build something together</h3>
            <p className="contact-info-text">
              I'm currently open to internship and entry-level opportunities. Whether you have
              a question or just want to say hi, my inbox is always open!
            </p>

            <div className="socials-list">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="social-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="social-icon">{s.icon}</div>
                  <div>
                    <div className="social-label">{s.label}</div>
                    <div className="social-value">{s.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Rayappan" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Rayappan@example.com" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Hi Rayappan, I'd like to discuss..." rows={5} required />
              </div>
              <button type="submit" className={`btn-send ${sent ? "sent" : ""}`}>
                {sent ? <><FiCheck /> Message Sent!</> : <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
