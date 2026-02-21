import { useState, useEffect } from "react";

const SKILLS = {
  "Operating Systems": [
    "Linux (Ubuntu/CentOS)",
    "Windows Server"
  ],
  "Networking": [
    "TCP/IP",
    "DNS",
    "HTTP/HTTPS",
    "Load Balancing",
    "Firewall",
    "VPN",
    "Subnetting"
  ],
  "Virtualization & Container": [
    "VMware ESXi",
    "Docker",
    "Kubernetes"
  ],
  "Cloud": [
    "AWS",
    "Google Cloud (GCP)"
  ],
  "Infrastructure as Code": [
    "Ansible",
    "Terraform"
  ],
  "Monitoring & Logging": [
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Alert Manager"
  ],
  "CI/CD & Tools": [
    "Git",
    "GitHub",
    "Bitbucket",
    "Jenkins",
    "Swagger"
  ],
  "Database": [
    "PostgreSQL",
    "SQL Server",
    "Redis",
    "RabbitMQ"
  ],
  "Programming & Scripting": [
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "Python",
    "Bash Script"
  ]
};

const EXPERIENCES = [
  {
    role: "DevOps & System Monitoring",
    company: "MPSolutions Company",
    location: "Me Tri, Ha Noi",
    period: "05/2024 – 06/2025",
    color: "#00ff9d",
    bullets: [
      "Deployed and maintained applications on on-premises infrastructure running Server, handling system setup, security configurations, and service management.",
      "Utilized VMware ESXi to manage virtual servers.",
      "Designed and implemented CI/CD pipelines using Jenkins to automate build and deployment processes for backend services.",
      "Built and maintained separate environments including Testing, Staging, and Production.",
      "Used Docker and managed multi-container environments with Docker Compose.",
      "Set up and managed database infrastructure including regular backups, restoration procedures, and load balancing.",
      "Monitored system health and performance with Prometheus and Grafana.",
    ],
  },
  {
    role: "Frontend Intern",
    company: "Remote",
    location: "Remote",
    period: "03/2024 – 05/2024",
    color: "#00cfff",
    bullets: [
      "Contributed to the development and maintenance of the Arobid web application using Next.js and TypeScript.",
      "Fixed UI and logic-related bugs to improve overall user experience and interface stability.",
      "Integrated and consumed backend APIs using Swagger for seamless data flow.",
      "Followed code standards, participated in code reviews, and continuously improved coding skills.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Linux Kernel Packet Processing Monitoring",
    link: "https://github.com/SeanNG21/kernel-packet-tracer/",
    tag: "eBPF · Kernel · Observability",
    desc: "A monitoring system built using eBPF to trace and visualize network packet processing inside the Linux kernel in real time, enabling low-overhead observability and deep inspection of kernel-level network behavior.",
  },
  {
    name: "HRM360 System Infrastructure & Monitoring",
    link: null,
    tag: "Infrastructure · IDS/IPS · Monitoring",
    desc: "Complete server-side infrastructure for HRM360: centralized monitoring, alerting, database replication, security monitoring (IDS/IPS), and operational stability in a production environment.",
  },
  {
    name: "Autoscaling Databases in Kubernetes",
    link: null,
    tag: "Kubernetes · Autoscaling · Cost Optimization",
    desc: "A functionality enabling a cluster to autonomously adjust node count and allocate/deallocate pod resources based on demand, optimizing resource utilization and performance.",
  },
  {
    name: "Transportation & Delivery Website",
    link: null,
    tag: "DMS · Web · Logistics",
    desc: "A delivery management software (DMS) for coordinating, overseeing, and executing delivery tasks efficiently.",
  },
];

function TerminalText({ text, speed = 45 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {!done && (
        <span style={{
          display: "inline-block", width: "2px", height: "1em",
          background: "#00ff9d", marginLeft: "2px", verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }} />
      )}
    </span>
  );
}

function GlitchText({ text }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const t = setInterval(() => { setG(true); setTimeout(() => setG(false), 120); }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{
      color: "#fff",
      ...(g ? { textShadow: "3px 0 #ff003c, -3px 0 #00cfff" } : {}),
      transition: "text-shadow 0.05s",
    }}>{text}</span>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ fontSize: "0.68rem", color: "#00ff9d", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
        {`// ${label}`}
      </div>
      <h2 style={{
        fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
        fontWeight: 700, color: "#fff",
        fontFamily: "'Space Grotesk', sans-serif",
        borderBottom: "1px solid #ffffff10",
        paddingBottom: "1rem",
      }}>{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const ids = ["home", "skills", "experience", "projects", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navItems = ["home", "skills", "experience", "projects", "contact"];

  return (
    <div style={{
      background: "#060810",
      color: "#c8d0e0",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      minHeight: "100vh",
      width: "100%",
      overflowX: "hidden",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; background: #060810; }
        html { scroll-behavior: smooth; }

        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,157,.3)} 50%{box-shadow:0 0 0 8px rgba(0,255,157,0)} }
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

        .nav-btn:hover   { color:#00ff9d!important; border-color:#00ff9d!important; }
        .skill-tag:hover { background:#00ff9d22!important; color:#00ff9d!important; border-color:#00ff9d!important; transform:translateY(-2px); }
        .proj-card:hover { border-color:#00ff9d44!important; background:#0d1117!important; }
        .proj-card:hover .proj-name { color:#00ff9d!important; }
        .exp-card:hover  { border-left-width:3px!important; }
        .section         { animation: fadeUp .6s ease both; }

        ::-webkit-scrollbar       { width:4px; }
        ::-webkit-scrollbar-track { background:#060810; }
        ::-webkit-scrollbar-thumb { background:#00ff9d44; border-radius:2px; }
        a { text-decoration:none; color:inherit; }
        a:hover { text-decoration:underline; }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          position: fixed; top: 64px; left: 0; width: 100%;
          background: rgba(6,8,16,0.98);
          border-bottom: 1px solid #00ff9d22;
          flex-direction: column;
          z-index: 98;
          animation: slideDown .2s ease;
        }
        .mobile-menu.open { display: flex; }
        .mob-item {
          padding: 1rem 1.5rem;
          font-size: 0.82rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #8899aa;
          border-bottom: 1px solid #ffffff08;
          cursor: pointer; transition: all .2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .mob-item:hover, .mob-item.active { color:#00ff9d; background:#00ff9d08; }

        /* Hamburger: hidden on desktop */
        .hamburger { display: none !important; }

        /* Tablet / Mobile breakpoint */
        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .hamburger     { display: flex !important; }
          .floating-tags { display: none !important; }
          .hero-inner    { flex-direction: column !important; }
          .hero-content  { max-width: 100% !important; width: 100% !important; }
          .proj-grid     { grid-template-columns: 1fr !important; }
          .edu-card      { flex-direction: column !important; }
          .edu-gpa       { margin-left: 0 !important; align-self: flex-start !important; }
          .exp-header    { flex-direction: column !important; }
          .stats-row     { gap: 2rem !important; }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .sec { padding: 4rem 1.25rem !important; }
          .hero-sec { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a { text-align: center; width: 100%; }
          .contact-inner { grid-template-columns: 1fr !important; padding: 1.5rem !important; }
        }
      `}</style>

      {/* Grid BG */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,255,157,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,157,.03) 1px,transparent 1px)",
        backgroundSize: "40px 40px", animation: "gridMove 8s linear infinite",
      }} />

      {/* Scanline */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 9999,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 4px)",
      }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100vw", zIndex: 100,
        background: scrollY > 50 ? "rgba(6,8,16,.96)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(12px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid #00ff9d22" : "none",
        transition: "all .3s ease",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <span style={{ color: "#00ff9d", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", flexShrink: 0 }}>
          {"<VH />"}
        </span>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "0.5rem" }}>
          {navItems.map(item => (
            <button key={item} className="nav-btn" onClick={() => scrollTo(item)} style={{
              background: "transparent", border: "1px solid",
              borderColor: activeSection === item ? "#00ff9d" : "#ffffff22",
              color: activeSection === item ? "#00ff9d" : "#888",
              padding: "4px 14px", borderRadius: "4px",
              fontSize: "0.73rem", letterSpacing: "0.1em",
              cursor: "pointer", textTransform: "uppercase",
              transition: "all .2s", fontFamily: "inherit",
            }}>{item}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            flexDirection: "column", gap: "5px",
            background: "transparent", border: "none", cursor: "pointer",
            padding: "6px", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: "24px", height: "2px",
              background: menuOpen ? "#00ff9d" : "#c8d0e0",
              borderRadius: "2px", transition: "all .25s ease",
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                    : "scaleX(0)"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map(item => (
          <div key={item}
            className={`mob-item${activeSection === item ? " active" : ""}`}
            onClick={() => scrollTo(item)}
          >{item}</div>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero-sec" style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "80px 2rem 2rem",
        maxWidth: "1000px", margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div className="hero-inner" style={{ display: "flex", alignItems: "center", width: "100%", gap: "2rem" }}>

          <div className="hero-content" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#00ff9d", fontSize: "0.72rem", letterSpacing: "0.2em", marginBottom: "1rem", opacity: 0.8 }}>
              $ whoami
            </div>
            <h1 style={{
              fontSize: "clamp(2rem, 9vw, 4.5rem)",
              fontWeight: 700, lineHeight: 1.1,
              marginBottom: "0.75rem",
              fontFamily: "'Space Grotesk', sans-serif",
              wordBreak: "break-word",
            }}>
              <GlitchText text="NGUYỄN" />{" "}
              <span style={{ color: "#00ff9d" }}>VIỆT HÙNG</span>
            </h1>

            <div style={{ fontSize: "clamp(0.82rem, 2.5vw, 1.1rem)", color: "#6b7a99", marginBottom: "2rem", letterSpacing: "0.03em" }}>
              <TerminalText text="DevOps Engineer · System Monitoring · Backend" speed={50} />
            </div>

            <div style={{
              background: "#0a0e1a", border: "1px solid #00ff9d33",
              borderRadius: "8px", padding: "1.25rem",
              marginBottom: "2rem",
              fontSize: "0.8rem", lineHeight: 1.8, color: "#8899aa",
            }}>
              <span style={{ color: "#00ff9d" }}>// 01_introduction</span><br />
              Highly capable of working independently as well as collaboratively.
              Strong organizational and problem-solving skills with the ability to adapt
              quickly to changing tasks. Open-minded, receptive to feedback, growth-oriented.
            </div>

            <div className="hero-btns" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <a href="mailto:nguyenviethung21092003@gmail.com" style={{
                background: "#00ff9d", color: "#060810",
                padding: "11px 28px", borderRadius: "4px",
                fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em",
                textTransform: "uppercase", animation: "pulse 2.5s infinite",
                fontFamily: "inherit", display: "inline-block",
              }}>Contact Me</a>
              <a href="https://linkedin.com/in/hungnguyen21ng" target="_blank" rel="noreferrer" style={{
                border: "1px solid #00ff9d44", color: "#00ff9d",
                padding: "11px 28px", borderRadius: "4px",
                fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.1em",
                textTransform: "uppercase", transition: "all .2s",
                display: "inline-block",
              }}>LinkedIn</a>
            </div>

            <div className="stats-row" style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[["3.34", "GPA"], ["1+ yr", "Experience"], ["4+", "Projects"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "clamp(1.3rem,4vw,1.7rem)", fontWeight: 700, color: "#00ff9d", fontFamily: "'Space Grotesk', sans-serif" }}>{val}</div>
                  <div style={{ fontSize: "0.62rem", color: "#445", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating tags: hidden on mobile via CSS */}
          <div className="floating-tags" style={{
            display: "flex", flexDirection: "column", gap: "0.7rem",
            animation: "float 4s ease-in-out infinite",
            flexShrink: 0,
          }}>
            {["Docker", "Jenkins", "Grafana", "Kubernetes", "AWS", "eBPF"].map((t, i) => (
              <div key={t} style={{
                background: "#0a0e1a", border: "1px solid #00ff9d22",
                padding: "5px 14px", borderRadius: "20px",
                fontSize: "0.7rem", color: "#00cfff",
                letterSpacing: "0.1em", whiteSpace: "nowrap",
                animationDelay: `${i * 0.15}s`,
              }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section sec" style={{
        padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="02_skills" title="Technical Stack" />
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: "1.75rem" }}>
            <div style={{ fontSize: "0.66rem", color: "#00ff9d", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              {`> ${cat}`}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {items.map(skill => (
                <span key={skill} className="skill-tag" style={{
                  border: "1px solid #ffffff18", padding: "5px 14px", borderRadius: "4px",
                  fontSize: "0.76rem", color: "#8899bb", cursor: "default",
                  transition: "all .2s", background: "#0a0e1a",
                }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section sec" style={{
        padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="03_experience" title="Work Experience" />

        {/* Education */}
        <div className="edu-card" style={{
          background: "#0a0e1a", border: "1px solid #00cfff33", borderRadius: "8px",
          padding: "1.25rem 1.5rem", marginBottom: "2.5rem",
          display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <div style={{ fontSize: "0.65rem", color: "#00cfff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Education</div>
            <div style={{ fontWeight: 600, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.85rem,2.5vw,1rem)" }}>
              University of Engineering and Technology
            </div>
            <div style={{ fontSize: "0.76rem", color: "#6b7a99", marginTop: "4px", lineHeight: 1.5 }}>
              Vietnam National University · Computer Networking & Data Communications (High Quality)
            </div>
          </div>
          <div className="edu-gpa" style={{
            marginLeft: "auto",
            background: "#00ff9d22", border: "1px solid #00ff9d44",
            padding: "10px 22px", borderRadius: "6px", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#00ff9d", fontFamily: "'Space Grotesk', sans-serif" }}>3.34</div>
            <div style={{ fontSize: "0.6rem", color: "#445", letterSpacing: "0.1em" }}>GPA</div>
          </div>
        </div>

        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-card" style={{
            borderLeft: `2px solid ${exp.color}44`,
            paddingLeft: "1.25rem",
            marginBottom: "2.5rem",
            transition: "border-left-width .2s",
          }}>
            <div className="exp-header" style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem",
            }}>
              <div>
                <div style={{ fontSize: "clamp(0.88rem,2.5vw,1rem)", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {exp.role}
                </div>
                <div style={{ fontSize: "0.73rem", color: exp.color, letterSpacing: "0.04em" }}>
                  {exp.company} · {exp.location}
                </div>
              </div>
              <div style={{
                background: `${exp.color}18`, border: `1px solid ${exp.color}44`,
                padding: "3px 10px", borderRadius: "4px",
                fontSize: "0.66rem", color: exp.color,
                letterSpacing: "0.04em", whiteSpace: "nowrap",
              }}>{exp.period}</div>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: "0.6rem", fontSize: "0.78rem", color: "#8899aa", lineHeight: 1.65 }}>
                  <span style={{ color: exp.color, flexShrink: 0, marginTop: "2px" }}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section sec" style={{
        padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="04_projects" title="Projects" />
        <div className="proj-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: "1.25rem",
        }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card" style={{
              background: "#07090f", border: "1px solid #ffffff10",
              borderRadius: "8px", padding: "1.5rem",
              transition: "all .25s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div className="proj-name" style={{
                  fontWeight: 700, fontSize: "clamp(0.8rem,2.5vw,0.9rem)",
                  color: "#dde", fontFamily: "'Space Grotesk', sans-serif",
                  transition: "color .2s",
                }}>{p.name}</div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ color: "#00cfff", fontSize: "0.7rem", flexShrink: 0, marginTop: "2px" }}>↗ link</a>
                )}
              </div>
              <div style={{
                fontSize: "0.63rem", color: "#00cfff", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: "0.75rem",
              }}>{p.tag}</div>
              <p style={{ fontSize: "0.78rem", color: "#6b7a99", lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section sec" style={{
        padding: "6rem 2rem 8rem", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="05_contact" title="Get In Touch" />
        <div className="contact-inner" style={{
          background: "#0a0e1a", border: "1px solid #00ff9d33",
          borderRadius: "12px", padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}>
          {[
            { icon: "✉", label: "Email", value: "nguyenviethung21092003@gmail.com", href: "mailto:nguyenviethung21092003@gmail.com" },
            { icon: "📞", label: "Phone", value: "0984 859 663", href: "tel:0984859663" },
            { icon: "📍", label: "Location", value: "Yen Hoa, Cau Giay, Ha Noi", href: null },
            { icon: "💼", label: "LinkedIn", value: "hungnguyen21ng", href: "https://linkedin.com/in/hungnguyen21ng" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ fontSize: "0.62rem", color: "#445", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {item.icon} {item.label}
              </div>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer"
                  style={{ color: "#00ff9d", fontSize: "0.78rem", wordBreak: "break-all" }}>
                  {item.value}
                </a>
              ) : (
                <span style={{ color: "#8899aa", fontSize: "0.78rem" }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "2rem 1.25rem",
        borderTop: "1px solid #ffffff08",
        fontSize: "0.68rem", color: "#334",
        position: "relative", zIndex: 1, letterSpacing: "0.1em",
      }}>
        © 2025 Nguyễn Việt Hùng · Built with React · <span style={{ color: "#00ff9d44" }}>system online</span>
      </div>
    </div>
  );
}