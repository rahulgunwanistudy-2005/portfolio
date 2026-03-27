import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, ChevronDown, Send, MapPin, Menu, X, GraduationCap, BarChart3, Star, Dumbbell, Users } from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const NAV_ITEMS = ["About", "Experience", "Projects", "Contact"];

const EXPERIENCE = [
  {
    role: "Business Analyst Intern",
    company: "Kota Patties",
    type: "Early-Stage Startup",
    period: "May 2025 — Jul 2025",
    location: "Bengaluru, Karnataka",
    points: [
      "Conducted market research and location feasibility analysis, identifying high-potential expansion zones using demographic and footfall data.",
      "Research insights directly contributed to the successful launch of a new store branch, resulting in a 20% increase in overall sales volume.",
      "Performed competitive benchmarking against 5+ segment leaders, analysing pricing models and product offerings to sharpen market entry strategy.",
    ],
  },
  {
    role: "Student Technical Intern",
    company: "Scalar",
    type: "EdTech",
    period: "Jun 2024 — Sep 2024",
    location: "Remote",
    points: [
      "Gained hands-on experience in API integration, connecting frontend interfaces with backend data services across multiple projects.",
      "Developed and tested custom Chrome Extensions to automate browser-based workflows, improving team productivity.",
      "Managed version control with Git, coordinating code updates and collaborating on a shared codebase with the engineering team.",
    ],
  },
];

const PROJECTS = [
  {
    title: "VibeCheck",
    subtitle: "AI Production-Readiness Analyzer",
    description: "An AI-powered tool that analyzes any public GitHub repo for production readiness. Paste a URL, get a Vibe Score (0-100) across 5 checks — RLS Guard, Secret Scan, Auth Holes, 80/20 Wall, and Code Quality — in under 30 seconds.",
    tech: ["FastAPI", "Groq", "React", "GitHub API"],
    icon: BarChart3,
    link: "https://vibe-check-lake.vercel.app",
    github: "https://github.com/rahulgunwanistudy-2005/VibeCheck",
  },
  {
    title: "Nexus Intelligence",
    subtitle: "Market Intelligence Platform",
    description: "A market intelligence platform scraping 60+ Amazon product listings per query, transforming HTML into structured Parquet datasets, and visualising price-to-value analytics via an interactive Plotly dashboard.",
    tech: ["FastAPI", "Playwright", "Docker", "Plotly"],
    icon: BarChart3,
    link: "https://nexus-intelligence.streamlit.app",
    github: "https://github.com/rahulgunwanistudy-2005/nexus-intelligence",
  },
  {
    title: "AstroClassifier",
    subtitle: "Celestial Object Classification",
    description: "An industry-grade 10-class galaxy morphology classifier built on 17,736 Galaxy10 DECals images, achieving Macro F1: 0.607 and Macro AUC: 0.935 across highly imbalanced classes.",
    tech: ["PyTorch", "Gradio", "W&B", "HuggingFace"],
    icon: Star,
    link: "https://huggingface.co/spaces/Rahu-l/astro-classifier",
    github: "https://github.com/rahulgunwanistudy-2005/astro_classifier",
  },
  {
    title: "Customer Segmentation",
    subtitle: "Churn Prediction Dashboard",
    description: "A dual-model system using RFM analysis and K-Means clustering to segment customers into actionable personas, with a Logistic Regression churn predictor for targeted retention campaigns.",
    tech: ["Python", "Scikit-Learn", "Streamlit"],
    icon: Users,
    link: "https://customer-churn-prediction--dashboard.streamlit.app",
    github: "https://github.com/rahulgunwanistudy-2005/ecommerce-customer-segmentation",
  },
];

const SKILLS = [
  "Python", "R", "SQL", "JavaScript", "HTML/CSS",
  "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "NLTK",
  "FastAPI", "React", "Streamlit", "Selenium",
  "Git", "Docker", "Linux", "Power BI", "Postman",
];

/* ───────────────────────── HELPERS ───────────────────────── */

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div style={{ width: 40, height: 1, background: "#d4d4d4" }} />
      <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a3a3a3" }}>
        {children}
      </span>
    </div>
  );
}

/* ───────────────────────── NAV ───────────────────────── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const fn = () => { if (window.scrollY > 10) setMobileOpen(false); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [mobileOpen]);

  const go = (id) => {
    setMobileOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.5s",
          background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontSize: 16, fontWeight: 600, color: "#171717", background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
            RG<span style={{ color: "#d4d4d4" }}>.</span>
          </button>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: 36 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                style={{ fontSize: 14, fontWeight: 500, color: "#737373", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#171717"}
                onMouseLeave={e => e.target.style.color = "#737373"}
              >
                {item}
              </button>
            ))}
            <a href="https://github.com/rahulgunwanistudy-2005" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, fontWeight: 500, color: "#fff", background: "#171717", padding: "8px 20px", borderRadius: 99, textDecoration: "none", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = "#404040"}
              onMouseLeave={e => e.target.style.background = "#171717"}
            >
              GitHub
            </a>
          </div>

          <button onClick={() => setMobileOpen(true)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <Menu size={22} strokeWidth={1.5} color="#404040" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 55, background: "rgba(0,0,0,0.08)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
            >
              <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
                <X size={24} strokeWidth={1.5} color="#404040" />
              </button>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  onClick={() => go(item)}
                  style={{ fontSize: 28, fontWeight: 300, color: "#262626", background: "none", border: "none", cursor: "pointer", padding: "8px 32px", letterSpacing: "0.02em" }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      {/* Orb */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", opacity: 0.04, background: "radial-gradient(circle, #64748b 0%, transparent 70%)" }} />

      <motion.div style={{ opacity, y, position: "relative", zIndex: 10, textAlign: "center", padding: "0 32px", maxWidth: 680, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 99, border: "1px solid #e5e5e5", background: "rgba(255,255,255,0.6)", marginBottom: 48 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#737373", letterSpacing: "0.15em", textTransform: "uppercase" }}>Available for opportunities</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 600, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1.05, margin: 0 }}
        >
          Rahul Gunwani
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginTop: 24, fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300, color: "#737373", letterSpacing: "0.02em" }}
        >
          Data Science <span style={{ color: "#d4d4d4", margin: "0 8px" }}>&</span> Web Development
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{ marginTop: 20, fontSize: "clamp(15px, 1.8vw, 18px)", color: "#a3a3a3", maxWidth: 480, margin: "20px auto 0", lineHeight: 1.7, fontWeight: 300 }}
        >
          Crafting intelligent data solutions and seamless digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "14px 28px", background: "#171717", color: "#fff", fontSize: 14, fontWeight: 500, borderRadius: 99, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#404040"}
            onMouseLeave={e => e.currentTarget.style.background = "#171717"}
          >
            View Work <ArrowUpRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "14px 28px", background: "transparent", color: "#525252", fontSize: 14, fontWeight: 500, borderRadius: 99, border: "1px solid #e5e5e5", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#a3a3a3"; e.currentTarget.style.color = "#171717"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.color = "#525252"; }}
          >
            Get in Touch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}
        >
          {[
            { icon: Github, href: "https://github.com/rahulgunwanistudy-2005", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/rahul-gunwani", label: "LinkedIn" },
            { icon: Mail, href: "mailto:rahulgunwani.work@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#a3a3a3", transition: "all 0.3s", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#a3a3a3"; e.currentTarget.style.color = "#171717"; e.currentTarget.style.background = "#fafafa"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.color = "#a3a3a3"; e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} color="#d4d4d4" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

function About() {
  return (
    <section id="about" style={{ padding: "160px 32px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>About</SectionLabel>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600, letterSpacing: "-0.025em", color: "#0a0a0a", lineHeight: 1.2, margin: "0 0 48px 0" }}>
          Building at the intersection of<br />
          <span style={{ color: "#a3a3a3" }}>data & engineering.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p style={{ fontSize: 17, color: "#737373", lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>
          I'm currently pursuing a Bachelor of Science in Data Science and Applications at the
          Indian Institute of Technology Madras, where I'm developing a deep foundation in
          machine learning, statistical modeling, and software engineering.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p style={{ fontSize: 17, color: "#737373", lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>
          My focus is on building production-grade systems that bridge the gap between raw data
          and actionable intelligence. I approach every project with an engineering mindset —
          prioritising clean architecture, reproducibility, and real-world impact.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p style={{ fontSize: 17, color: "#737373", lineHeight: 1.9, fontWeight: 300, marginBottom: 48 }}>
          Currently exploring opportunities in remote internships and open-source contributions,
          with a particular interest in programs like Google Summer of Code.
        </p>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 64 }}>
          <GraduationCap size={18} color="#a3a3a3" strokeWidth={1.5} />
          <span style={{ fontSize: 14, color: "#a3a3a3", fontWeight: 300 }}>IIT Madras · BS Data Science · 2024 — 2028</span>
        </div>
      </FadeIn>

      {/* Skills — single-column flow */}
      <FadeIn delay={0.3}>
        <h3 style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a3a3a3", marginBottom: 20 }}>
          Technical Skills
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {SKILLS.map((s) => (
            <span key={s} style={{ padding: "8px 16px", fontSize: 14, fontWeight: 400, color: "#525252", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 8, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4d4d4"; e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.background = "#fafafa"; }}
            >
              {s}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────────────────────── EXPERIENCE ───────────────────────── */

function Experience() {
  return (
    <section id="experience" style={{ padding: "160px 32px", background: "#fafafa" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Experience</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600, letterSpacing: "-0.025em", color: "#0a0a0a", lineHeight: 1.2, margin: "0 0 72px 0" }}>
            Where I've contributed<span style={{ color: "#d4d4d4" }}>.</span>
          </h2>
        </FadeIn>

        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ position: "relative", paddingLeft: 36, paddingBottom: i < EXPERIENCE.length - 1 ? 64 : 0, borderLeft: i < EXPERIENCE.length - 1 ? "1px solid #e5e5e5" : "1px solid transparent" }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: 0, top: 6, transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", border: "2px solid #d4d4d4" }} />

              <div style={{ marginBottom: 8 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em", margin: 0 }}>{exp.role}</h3>
                <p style={{ fontSize: 15, color: "#737373", fontWeight: 300, marginTop: 4 }}>
                  {exp.company} <span style={{ color: "#d4d4d4", margin: "0 6px" }}>·</span>
                  <span style={{ color: "#a3a3a3" }}>{exp.type}</span>
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "#a3a3a3", fontWeight: 300 }}>{exp.period}</span>
                <span style={{ color: "#e5e5e5" }}>|</span>
                <span style={{ fontSize: 13, color: "#a3a3a3", fontWeight: 300, display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={12} strokeWidth={1.5} /> {exp.location}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {exp.points.map((point, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ marginTop: 10, width: 5, height: 5, borderRadius: "50%", background: "#d4d4d4", flexShrink: 0 }} />
                    <span style={{ fontSize: 16, color: "#737373", lineHeight: 1.75, fontWeight: 300 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          padding: "40px 0",
          borderBottom: "1px solid #f0f0f0",
          transition: "all 0.4s",
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: hovered ? "#f5f5f5" : "#fafafa",
            border: `1px solid ${hovered ? "#e5e5e5" : "#f0f0f0"}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s"
          }}>
            <Icon size={20} strokeWidth={1.5} color={hovered ? "#525252" : "#a3a3a3"} style={{ transition: "color 0.3s" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em", margin: 0 }}>{project.title}</h3>
              {project.wip && (
                <span style={{ padding: "4px 12px", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d97706", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: 99 }}>
                  In Progress
                </span>
              )}
            </div>
            <p style={{ fontSize: 14, color: "#a3a3a3", fontWeight: 300, marginTop: 2 }}>{project.subtitle}</p>
          </div>
        </div>

        <p style={{ fontSize: 16, color: "#737373", lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.tech.map((t) => (
            <span key={t} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "#737373", background: "#fafafa", borderRadius: 6 }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "#a3a3a3", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#171717"}
              onMouseLeave={e => e.currentTarget.style.color = "#a3a3a3"}
            >
              <Github size={15} strokeWidth={1.5} /> Source
            </a>
          )}
          {project.link && !project.wip && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "#a3a3a3", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#171717"}
              onMouseLeave={e => e.currentTarget.style.color = "#a3a3a3"}
            >
              <ExternalLink size={15} strokeWidth={1.5} /> Live Demo
            </a>
          )}
        </div>

        {/* Animated accent line */}
        <motion.div
          style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1, background: "#171717", originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "160px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Projects</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600, letterSpacing: "-0.025em", color: "#0a0a0a", lineHeight: 1.2, margin: 0 }}>
            Selected work<span style={{ color: "#d4d4d4" }}>.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#a3a3a3", fontWeight: 300, marginTop: 16, marginBottom: 48, maxWidth: 520, lineHeight: 1.7 }}>
            A curated collection of projects spanning machine learning, data engineering, and full-stack development.
          </p>
        </FadeIn>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", padding: "14px 20px", fontSize: 16, color: "#171717",
    background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12,
    outline: "none", fontWeight: 300, fontFamily: "inherit", transition: "border-color 0.3s",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ padding: "160px 32px", background: "#fafafa" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600, letterSpacing: "-0.025em", color: "#0a0a0a", lineHeight: 1.2, margin: "0 0 12px 0" }}>
            Let's build something<br />
            <span style={{ color: "#a3a3a3" }}>together.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#737373", fontWeight: 300, lineHeight: 1.8, marginBottom: 56, maxWidth: 480 }}>
            I'm always open to discussing new opportunities, interesting projects,
            or potential collaborations.
          </p>
        </FadeIn>

        {/* Contact info */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 64 }}>
            <a href="mailto:rahulgunwani.work@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 16, color: "#737373", textDecoration: "none", fontWeight: 300, transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#171717"}
              onMouseLeave={e => e.currentTarget.style.color = "#737373"}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={17} strokeWidth={1.5} color="#a3a3a3" />
              </div>
              rahulgunwani.work@gmail.com
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 16, color: "#737373", fontWeight: 300 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={17} strokeWidth={1.5} color="#a3a3a3" />
              </div>
              India
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              {[
                { icon: Github, href: "https://github.com/rahulgunwanistudy-2005" },
                { icon: Linkedin, href: "https://linkedin.com/in/rahul-gunwani" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#a3a3a3", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4d4d4"; e.currentTarget.style.color = "#171717"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.color = "#a3a3a3"; }}
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a3a3a3", marginBottom: 10 }}>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#a3a3a3"}
                onBlur={e => e.target.style.borderColor = "#e5e5e5"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a3a3a3", marginBottom: 10 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#a3a3a3"}
                onBlur={e => e.target.style.borderColor = "#e5e5e5"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a3a3a3", marginBottom: 10 }}>Message</label>
              <textarea rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..." style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = "#a3a3a3"}
                onBlur={e => e.target.style.borderColor = "#e5e5e5"}
              />
            </div>
            <button onClick={handleSubmit}
              style={{ width: "100%", padding: "16px 0", background: "#171717", color: "#fff", fontSize: 14, fontWeight: 500, borderRadius: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#404040"}
              onMouseLeave={e => e.currentTarget.style.background = "#171717"}
            >
              {sent ? "Message Sent ✓" : <><span>Send Message</span><Send size={15} /></>}
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #f0f0f0", padding: "48px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <p style={{ fontSize: 13, color: "#a3a3a3", fontWeight: 300, margin: 0 }}>
          © {new Date().getFullYear()} Rahul Gunwani
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {[
            { icon: Github, href: "https://github.com/rahulgunwanistudy-2005" },
            { icon: Linkedin, href: "https://linkedin.com/in/rahul-gunwani" },
            { icon: Mail, href: "mailto:rahulgunwani.work@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: "#d4d4d4", transition: "color 0.3s", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#525252"}
              onMouseLeave={e => e.currentTarget.style.color = "#d4d4d4"}
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── APP ───────────────────────── */

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#0a0a0a", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}