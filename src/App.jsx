import { useState, useEffect, useRef } from "react";

const SKILLS = {
  "Programming": ["JavaScript", "NodeJS", "HTML/CSS"],
  "Frameworks": ["NextJS", "ReactJS", "TypeScript"],
  "Tools": ["Git", "GitHub", "Nulab", "Sentry", "Swagger", "Jenkins", "Grafana", "Ansible", "Redis", "RabbitMQ", "PostgreSQL"],
  "DevOps": ["Docker", "CI/CD", "Monitoring", "IDS/IPS", "Antivirus", "VMware ESXi", "Prometheus"],
  "Cloud & OS": ["Google Cloud (GCP)", "UNIX/Linux", "Ubuntu Server"],
  "Database": ["SQL Server", "PostgreSQL"],
};

const EXPERIENCES = [
  {
    role: "DevOps & System Monitoring (Junior)",
    company: "MPSolutions Company",
    location: "Me Tri, Ha Noi",
    period: "05/2024 – 06/2025",
    color: "#00ff9d",
    bullets: [
      "Deployed and maintained applications on on-premises infrastructure running Ubuntu Server, handling system setup, security configurations, and service management.",
      "Utilized VMware ESXi to manage virtual servers.",
      "Designed and implemented CI/CD pipelines using Jenkins to automate build and deployment processes for backend services.",
      "Built and maintained separate environments including Testing, Staging, and Production.",
      "Using Docker and managed multi-container environments with Docker Compose.",
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
    link: "https://hrm360.com.vn/",
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

function TerminalText({ text, speed = 40, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span className={className}>
      {displayed}
      {!done && <span style={{ animation: "blink 1s step-end infinite", display: "inline-block", width: "2px", height: "1em", background: "#00ff9d", marginLeft: "2px", verticalAlign: "middle" }} />}
    </span>
  );
}

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{
        position: "relative",
        color: "#fff",
        letterSpacing: "0.05em",
        ...(glitch ? { textShadow: "3px 0 #ff003c, -3px 0 #00cfff" } : {}),
        transition: "text-shadow 0.05s",
      }}>{text}</span>
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; background: #060810; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,255,157,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(0,255,157,0); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .nav-btn:hover { color: #00ff9d !important; border-color: #00ff9d !important; }
        .skill-tag:hover { background: #00ff9d22 !important; color: #00ff9d !important; border-color: #00ff9d !important; transform: translateY(-2px); }
        .proj-card:hover { border-color: #00ff9d44 !important; background: #0d1117 !important; }
        .proj-card:hover .proj-name { color: #00ff9d !important; }
        .exp-card:hover { border-left-width: 3px !important; }
        .section { animation: fadeUp 0.6s ease both; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060810; }
        ::-webkit-scrollbar-thumb { background: #00ff9d44; border-radius: 2px; }
        a { text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Scanline overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 9999,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Grid background */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridMove 8s linear infinite",
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100vw", zIndex: 100,
        background: scrollY > 50 ? "rgba(6,8,16,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid #00ff9d22" : "none",
        transition: "all 0.3s ease",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <span style={{ color: "#00ff9d", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em" }}>
          {"<VH />"}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {navItems.map(item => (
            <button key={item}
              className="nav-btn"
              onClick={() => scrollTo(item)}
              style={{
                background: "transparent", border: "1px solid",
                borderColor: activeSection === item ? "#00ff9d" : "#ffffff22",
                color: activeSection === item ? "#00ff9d" : "#888",
                padding: "4px 12px", borderRadius: "4px",
                fontSize: "0.75rem", letterSpacing: "0.1em",
                cursor: "pointer", textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}>
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "0 2rem", maxWidth: "960px", margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div>
          <div style={{ color: "#00ff9d", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "1rem", opacity: 0.8 }}>
            $ whoami
          </div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700, lineHeight: 1.1,
            marginBottom: "0.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            <GlitchText text="NGUYỄN" />{" "}
            <span style={{ color: "#00ff9d" }}>VIỆT HÙNG</span>
          </h1>
          <div style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "#6b7a99",
            marginBottom: "2rem",
            letterSpacing: "0.05em",
          }}>
            <TerminalText text="DevOps Engineer · System Monitoring · Backend" speed={50} />
          </div>

          <div style={{
            background: "#0a0e1a",
            border: "1px solid #00ff9d33",
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            maxWidth: "560px",
            marginBottom: "2.5rem",
            fontSize: "0.85rem",
            lineHeight: 1.8,
            color: "#8899aa",
          }}>
            <span style={{ color: "#00ff9d" }}>// about.txt</span><br />
            Highly capable of working independently as well as collaboratively.
            Strong organizational and problem-solving skills with the ability to adapt
            quickly to changing tasks. Open-minded, receptive to feedback, growth-oriented.
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="mailto:nguyenviethung21092003@gmail.com" style={{
              background: "#00ff9d", color: "#060810",
              padding: "10px 24px", borderRadius: "4px",
              fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em",
              textTransform: "uppercase", display: "inline-block",
              animation: "pulse 2.5s infinite",
            }}>Contact Me</a>
            <a href="https://linkedin.com/in/hungnguyen21ng" target="_blank" style={{
              border: "1px solid #00ff9d44", color: "#00ff9d",
              padding: "10px 24px", borderRadius: "4px",
              fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.1em",
              textTransform: "uppercase", display: "inline-block",
              transition: "all 0.2s",
            }}>LinkedIn</a>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {[["GPA", "3.34"], ["Experience", "1+ yr"], ["Projects", "4+"]].map(([label, val]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#00ff9d", fontFamily: "'Space Grotesk', sans-serif" }}>{val}</div>
                <div style={{ fontSize: "0.7rem", color: "#445", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating badge */}
        <div style={{
          position: "absolute", right: "4rem", top: "50%",
          transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "0.75rem",
          animation: "float 4s ease-in-out infinite",
          opacity: 0.85,
        }}>
          {["Docker", "Jenkins", "Grafana", "Kubernetes", "eBPF"].map((t, i) => (
            <div key={t} style={{
              background: "#0a0e1a",
              border: "1px solid #00ff9d22",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.7rem",
              color: "#00cfff",
              letterSpacing: "0.1em",
              animationDelay: `${i * 0.2}s`,
            }}>{t}</div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section" style={{
        padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="02_skills" title="Technical Stack" />
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: "1.75rem" }}>
            <div style={{
              fontSize: "0.7rem", color: "#00ff9d", letterSpacing: "0.2em",
              textTransform: "uppercase", marginBottom: "0.75rem",
            }}>
              {`> ${cat}`}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {items.map(skill => (
                <span key={skill} className="skill-tag" style={{
                  border: "1px solid #ffffff18",
                  padding: "5px 14px",
                  borderRadius: "4px",
                  fontSize: "0.78rem",
                  color: "#8899bb",
                  cursor: "default",
                  transition: "all 0.2s ease",
                  background: "#0a0e1a",
                }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section" style={{
        padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="03_experience" title="Work Experience" />

        {/* Education callout */}
        <div style={{
          background: "#0a0e1a",
          border: "1px solid #00cfff33",
          borderRadius: "8px",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#00cfff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>Education</div>
            <div style={{ fontWeight: 600, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>University of Engineering and Technology</div>
            <div style={{ fontSize: "0.8rem", color: "#6b7a99" }}>Vietnam National University · Computer Networking & Data Communications (High Quality)</div>
          </div>
          <div style={{
            marginLeft: "auto",
            background: "#00ff9d22",
            border: "1px solid #00ff9d44",
            padding: "8px 20px", borderRadius: "6px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#00ff9d", fontFamily: "'Space Grotesk', sans-serif" }}>3.34</div>
            <div style={{ fontSize: "0.65rem", color: "#445", letterSpacing: "0.1em" }}>GPA</div>
          </div>
        </div>

        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-card" style={{
            borderLeft: `2px solid ${exp.color}44`,
            paddingLeft: "1.5rem",
            marginBottom: "2.5rem",
            transition: "border-left-width 0.2s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{exp.role}</div>
                <div style={{ fontSize: "0.78rem", color: exp.color, letterSpacing: "0.05em" }}>{exp.company} · {exp.location}</div>
              </div>
              <div style={{
                background: `${exp.color}18`,
                border: `1px solid ${exp.color}44`,
                padding: "3px 10px", borderRadius: "4px",
                fontSize: "0.7rem", color: exp.color, height: "fit-content",
                letterSpacing: "0.05em",
              }}>{exp.period}</div>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem", color: "#8899aa", lineHeight: 1.6 }}>
                  <span style={{ color: exp.color, flexShrink: 0 }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section" style={{
        padding: "6rem 2rem", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="04_projects" title="Projects" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="proj-card" style={{
              background: "#07090f",
              border: "1px solid #ffffff10",
              borderRadius: "8px",
              padding: "1.5rem",
              transition: "all 0.25s ease",
              cursor: "default",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                <div className="proj-name" style={{
                  fontWeight: 700, fontSize: "0.9rem", color: "#dde",
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: "color 0.2s",
                }}>{p.name}</div>
                {p.link && (
                  <a href={p.link} target="_blank" style={{ color: "#00cfff", fontSize: "0.7rem", flexShrink: 0 }}>↗ link</a>
                )}
              </div>
              <div style={{
                fontSize: "0.68rem", color: "#00cfff", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: "0.75rem",
              }}>{p.tag}</div>
              <p style={{ fontSize: "0.8rem", color: "#6b7a99", lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{
        padding: "6rem 2rem 8rem", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        <SectionHeader label="05_contact" title="Get In Touch" />
        <div style={{
          background: "#0a0e1a",
          border: "1px solid #00ff9d33",
          borderRadius: "12px",
          padding: "2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {[
            { icon: "✉", label: "Email", value: "nguyenviethung21092003@gmail.com", href: "mailto:nguyenviethung21092003@gmail.com" },
            { icon: "📞", label: "Phone", value: "0984 859 663", href: "tel:0984859663" },
            { icon: "📍", label: "Location", value: "Yen Hoa, Cau Giay, Ha Noi", href: null },
            { icon: "💼", label: "LinkedIn", value: "hungnguyen21ng", href: "https://linkedin.com/in/hungnguyen21ng" },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", flexDirection: "column", gap: "4px",
            }}>
              <div style={{ fontSize: "0.68rem", color: "#445", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {item.icon} {item.label}
              </div>
              {item.href ? (
                <a href={item.href} target="_blank" style={{ color: "#00ff9d", fontSize: "0.82rem", wordBreak: "break-all" }}>
                  {item.value}
                </a>
              ) : (
                <span style={{ color: "#8899aa", fontSize: "0.82rem" }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "2rem",
        borderTop: "1px solid #ffffff08",
        fontSize: "0.72rem", color: "#334",
        position: "relative", zIndex: 1,
        letterSpacing: "0.1em",
      }}>
        © 2025 Nguyễn Việt Hùng · Built with React · <span style={{ color: "#00ff9d44" }}>system online</span>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#00ff9d", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
        {`// ${label}`}
      </div>
      <h2 style={{
        fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
        fontWeight: 700, color: "#fff",
        fontFamily: "'Space Grotesk', sans-serif",
        borderBottom: "1px solid #ffffff10",
        paddingBottom: "1rem",
      }}>{title}</h2>
    </div>
  );
}