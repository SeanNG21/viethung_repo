import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink,
  ChevronDown, Menu, X, ArrowUpRight,
  Server, Cloud, Shield, Database, Network, Code2, Activity, Settings2,
  Sun, Moon
} from "lucide-react";

const Facebook = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const SKILLS = [
  { icon: "Server",    label: "Kubernetes & Docker",           tags: ["Kubernetes", "Docker", "Helm Chart", "ArgoCD", "Vault", "containerd", "emissary-ingress"] },
  { icon: "Settings2", label: "CI/CD & Automation",            tags: ["Jenkins", "GitLab CI", "Ansible", "GitOps"] },
  { icon: "Activity",  label: "Monitoring & Logging",          tags: ["Prometheus", "Grafana", "Alert Manager", "Sentry", "ELK Stack"] },
  { icon: "Cloud",     label: "Cloud & Virtualization",        tags: ["AWS", "Google Cloud Platform", "VMware ESXi", "vSphere", "vCenter"] },
  { icon: "Database",  label: "Database Administration",       tags: ["PostgreSQL", "MariaDB Cluster", "SQL Server", "Redis", "RabbitMQ"] },
  { icon: "Network",   label: "High Availability & Networking",tags: ["Keepalived (VRRP)", "pfSense Firewall", "Cloudflare", "TCP/IP", "DNS", "Load Balancing", "VPN"] },
  { icon: "Shield",    label: "Security",                      tags: ["IDS/IPS", "Antivirus", "Hardening Server", "Tuning Server"] },
  { icon: "Code2",     label: "Programming & Scripting",       tags: ["JavaScript", "TypeScript", "Node.js", "React", "Python", "Bash Script"] },
];

const SKILL_ICONS = {
  Server:    <Server size={18} />,
  Settings2: <Settings2 size={18} />,
  Activity:  <Activity size={18} />,
  Cloud:     <Cloud size={18} />,
  Database:  <Database size={18} />,
  Network:   <Network size={18} />,
  Shield:    <Shield size={18} />,
  Code2:     <Code2 size={18} />,
};

const EXPERIENCES = [
  {
    role: "DevOps & System Engineer", company: "PayTech JSC", location: "Cau Giay, Ha Noi",
    period: "02/2025 – Present", color: "#c6a77d",
    note: "Products: VitaPay & eMoney (Digital Wallet Applications)",
    bullets: [
      "Managed and maintained complete server infrastructure for VitaPay and eMoney digital wallet platforms.",
      "Operated and optimized MariaDB cluster and PostgreSQL primary-standby cluster, including backup, restoration, and load balancing for high availability.",
      "Designed and implemented CI/CD pipelines using Jenkins for services.",
      "Built and maintained a centralized log server aggregating logs from all application systems.",
      "Implemented OS-level and database backups across all 3 environments (VM server, cloud, local disk) ensuring disaster recovery readiness.",
      "Deployed centralized monitoring system (Prometheus + Grafana + Alert Manager) covering all infrastructure components.",
      "Configured Keepalived (VRRP) for high availability, ensuring zero-downtime failover and continuous system operation.",
      "Managed Cloudflare for DNS management, DDoS protection, SSL termination, and traffic proxying.",
      "Managed VMware vSphere and vCenter environments for VM provisioning and lifecycle management.",
      "Collaborated with Viettel, VinaPhone, and MobiFone on VAS projects: physical server installation at telecom DCs, hardening, and monitoring on telecom cloud.",
      "Built and managed Docker and Kubernetes infrastructure for new services, using Helm charts, Emissary-ingress, Vault, and ArgoCD for application delivery, ingress routing, secrets management, and GitOps workflows.",
      "Developed an AI agent system to automate incident diagnosis and remediation, significantly reducing MTTR.",
    ],
  },
  {
    role: "DevOps & System Admin", company: "MPSolutions Company", location: "Me Tri, Ha Noi",
    period: "05/2024 – 09/2025", color: "#a08060", note: null,
    bullets: [
      "Deployed and maintained applications on on-premises Ubuntu Server infrastructure.",
      "Utilized VMware ESXi to manage virtual servers.",
      "Designed and implemented CI/CD pipelines using Jenkins to automate build and deployment.",
      "Built and maintained Testing, Staging, and Production environments.",
      "Managed multi-container environments with Docker, Docker Compose, and basic Kubernetes deployments.",
      "Set up and managed database infrastructure including backups, restoration, and load balancing.",
      "Monitored system health and performance with Prometheus and Grafana.",
    ],
  },
  {
    role: "Frontend Intern", company: "Remote", location: "Remote",
    period: "03/2024 – 05/2024", color: "#7a6a5a", note: null,
    bullets: [
      "Contributed to the development and maintenance of the Arobid web app using Next.js and TypeScript.",
      "Fixed UI and logic-related bugs to improve user experience and interface stability.",
      "Integrated and consumed backend APIs using Swagger for seamless data flow.",
      "Followed code standards, participated in code reviews, and continuously improved coding skills.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Linux Kernel Packet Processing Monitoring",
    link: "https://github.com/SeanNG21/kernel-packet-tracer/",
    tags: ["eBPF", "Kernel", "Observability", "Go"],
    desc: "A monitoring system built using eBPF to trace and visualize network packet processing inside the Linux kernel in real time, enabling low-overhead observability and deep inspection of kernel-level network behavior.",
  },
  {
    name: "HRM360 System Infrastructure & Monitoring",
    link: "https://hrm360.com.vn/",
    tags: ["Infrastructure", "IDS/IPS", "Monitoring", "PostgreSQL"],
    desc: "Complete server-side infrastructure for HRM360: centralized monitoring, alerting, database replication, security monitoring (IDS/IPS), and operational stability in a production environment.",
  },
  {
    name: "Autoscaling Databases in Kubernetes",
    link: null,
    tags: ["Kubernetes", "Autoscaling", "Cost Optimization", "Helm"],
    desc: "A functionality enabling a cluster to autonomously adjust node count and allocate/deallocate pod resources based on demand, optimizing resource utilization and performance.",
  },
  {
    name: "Transportation & Delivery Website",
    link: null,
    tags: ["DMS", "Web", "Logistics", "Docker"],
    desc: "A delivery management software (DMS) for coordinating, overseeing, and executing delivery tasks efficiently across logistics operations.",
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const step = to / (1800 / 16);
    const iv = setInterval(() => {
      i += step;
      if (i >= to) { setCount(to); clearInterval(iv); }
      else setCount(Math.floor(i));
    }, 16);
    return () => clearInterval(iv);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navScrolled, setNavScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  const navItems = ["About", "Experience", "Skills", "Projects", "Contact"];

  // ─── Theme tokens ────────────────────────────────────────────────────────────
  const T = dark ? {
    bg: "#0f0f0f",
    bgCard: "#171717",
    bgCardHover: "#1c1c1c",
    bgEdu: "#171717",
    bgPeriod: "rgba(255,255,255,0.04)",
    text: "#c8d0e0",
    textHeading: "#e7e5e4",
    textMuted: "rgba(231,229,228,0.58)",
    textFaint: "rgba(231,229,228,0.46)",
    textVeryFaint: "rgba(231,229,228,0.28)",
    textNav: "rgba(231,229,228,0.45)",
    accent: "#c6a77d",
    accentR: "198,167,125",
    borderCard: "rgba(198,167,125,0.09)",
    borderCardHover: "rgba(198,167,125,0.3)",
    borderPeriod: "rgba(255,255,255,0.07)",
    borderEdu: "rgba(198,167,125,0.12)",
    borderStat: "rgba(198,167,125,0.22)",
    borderDivider: "rgba(198,167,125,0.22)",
    borderFooter: "rgba(198,167,125,0.1)",
    navBg: "rgba(15,15,15,0.96)",
    menuBg: "rgba(15,15,15,0.97)",
    menuBorder: "rgba(198,167,125,0.12)",
    menuItemBorder: "rgba(255,255,255,0.04)",
    tagBorder: "rgba(198,167,125,0.25)",
    tagBg: "rgba(198,167,125,0.06)",
    tagColor: "rgba(198,167,125,0.7)",
    glassCardBg: "rgba(20,18,14,0.78)",
    glassCardBorder: "rgba(198,167,125,0.15)",
    contactBorder: "rgba(198,167,125,0.1)",
    contactColor: "rgba(231,229,228,0.5)",
    contactHoverBg: "rgba(198,167,125,0.05)",
    projRadial: "rgba(198,167,125,0.055)",
    toggleBg: "rgba(198,167,125,0.12)",
    toggleBorder: "rgba(198,167,125,0.2)",
    scrollbarTrack: "#0f0f0f",
    scrollbarThumb: "#c6a77d44",
    heroBg: "linear-gradient(145deg, #1e1a14, #2a221a)",
    heroOverlay: "linear-gradient(to top, rgba(15,15,15,0.4) 0%, transparent 55%)",
    grainOpacity: 0.45,
    glow1: "rgba(198,167,125,0.05)",
    glow2: "rgba(198,167,125,0.04)",
    footerText: "rgba(231,229,228,0.18)",
    footerLink: "rgba(198,167,125,0.45)",
    scrollLabel: "rgba(231,229,228,0.22)",
    scrollChevron: "rgba(198,167,125,0.38)",
    navBorder: "rgba(198,167,125,0.08)",
  } : {
    bg: "#f7f5f2",
    bgCard: "#ffffff",
    bgCardHover: "#f5f0e8",
    bgEdu: "#f7f5f2",
    bgPeriod: "rgba(0,0,0,0.04)",
    text: "#4a4540",
    textHeading: "#1a1714",
    textMuted: "rgba(26,23,20,0.65)",
    textFaint: "rgba(26,23,20,0.52)",
    textVeryFaint: "rgba(26,23,20,0.38)",
    textNav: "rgba(26,23,20,0.45)",
    accent: "#9a7348",
    accentR: "154,115,72",
    borderCard: "rgba(154,115,72,0.14)",
    borderCardHover: "rgba(154,115,72,0.38)",
    borderPeriod: "rgba(0,0,0,0.08)",
    borderEdu: "rgba(154,115,72,0.15)",
    borderStat: "rgba(154,115,72,0.25)",
    borderDivider: "rgba(154,115,72,0.18)",
    borderFooter: "rgba(154,115,72,0.15)",
    navBg: "rgba(247,245,242,0.96)",
    menuBg: "rgba(247,245,242,0.98)",
    menuBorder: "rgba(154,115,72,0.15)",
    menuItemBorder: "rgba(0,0,0,0.06)",
    tagBorder: "rgba(154,115,72,0.28)",
    tagBg: "rgba(154,115,72,0.08)",
    tagColor: "rgba(154,115,72,0.85)",
    glassCardBg: "rgba(245,242,237,0.92)",
    glassCardBorder: "rgba(154,115,72,0.2)",
    contactBorder: "rgba(154,115,72,0.18)",
    contactColor: "rgba(26,23,20,0.5)",
    contactHoverBg: "rgba(154,115,72,0.06)",
    projRadial: "rgba(154,115,72,0.055)",
    toggleBg: "rgba(154,115,72,0.1)",
    toggleBorder: "rgba(154,115,72,0.22)",
    scrollbarTrack: "#f7f5f2",
    scrollbarThumb: "#9a734844",
    heroBg: "linear-gradient(145deg, #ede8df, #e0d5c5)",
    heroOverlay: "linear-gradient(to top, rgba(247,245,242,0.35) 0%, transparent 55%)",
    grainOpacity: 0.18,
    glow1: "rgba(154,115,72,0.07)",
    glow2: "rgba(154,115,72,0.05)",
    footerText: "rgba(26,23,20,0.28)",
    footerLink: "rgba(154,115,72,0.6)",
    scrollLabel: "rgba(26,23,20,0.28)",
    scrollChevron: "rgba(154,115,72,0.5)",
    navBorder: "rgba(154,115,72,0.1)",
  };

  useEffect(() => {
    const ids = ["home", "about", "experience", "skills", "projects", "contact"];
    const onScroll = () => {
      setNavScrolled(window.scrollY > 50);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.35s, color 0.35s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${T.scrollbarThumb}; border-radius: 2px; }

        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: ${T.grainOpacity};
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${T.textNav}; text-decoration: none; cursor: pointer;
          transition: color 0.25s; background: none; border: none; padding: 0;
        }
        .nav-link:hover, .nav-link.active { color: ${T.accent}; }
        .tag-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px; font-weight: 400; letter-spacing: 0.03em;
          padding: 4px 12px; border-radius: 100px;
          border: 1px solid ${T.tagBorder};
          color: ${T.tagColor};
          background: ${T.tagBg};
          white-space: nowrap;
          transition: border-color 0.25s, background 0.25s;
        }
        .glass {
          background: ${T.glassCardBg};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid ${T.glassCardBorder};
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-card {
          background: ${T.bgCard}; border: 1px solid ${T.borderCard};
          border-radius: 10px; padding: 22px 24px;
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color 0.3s, background 0.3s;
          height: 100%;
        }
        .skill-card:hover { border-color: ${T.borderCardHover}; background: ${T.bgCardHover}; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 680px) { .projects-grid { grid-template-columns: 1fr; } }
        .proj-card {
          background: ${T.bgCard}; border: 1px solid ${T.borderCard};
          border-radius: 10px; padding: 26px 28px;
          display: flex; flex-direction: column; gap: 12px;
          transition: border-color 0.35s, transform 0.35s, background 0.35s;
          position: relative; overflow: hidden; height: 100%;
        }
        .proj-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at top left, ${T.projRadial}, transparent 65%);
          opacity: 0; transition: opacity 0.35s;
        }
        .proj-card:hover { border-color: ${T.borderCardHover}; transform: translateY(-3px); }
        .proj-card:hover::before { opacity: 1; }
        .exp-card {
          position: relative; border-left: 2px solid;
          padding: 22px 0 22px 32px;
          transition: padding-left 0.25s;
        }
        .exp-card:hover { padding-left: 40px; }
        .divider-line {
          height: 1px;
          background: linear-gradient(to right, transparent, ${T.borderDivider}, transparent);
          max-width: 900px; margin: 0 auto;
        }
        .contact-link {
          display: flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${T.contactColor}; text-decoration: none;
          padding: 14px 18px; border: 1px solid ${T.contactBorder};
          border-radius: 8px; transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .contact-link:hover { border-color: ${T.borderCardHover}; color: ${T.accent}; background: ${T.contactHoverBg}; }
        .theme-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          background: ${T.toggleBg}; border: 1px solid ${T.toggleBorder};
          cursor: pointer; color: ${T.accent};
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
        }
        .theme-toggle:hover { transform: scale(1.1); background: ${T.contactHoverBg}; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img-col { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      <div className="grain" />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 650, height: 650, borderRadius: "50%", background: T.glow1, filter: "blur(90px)", top: -220, left: -200 }} />
        <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: T.glow2, filter: "blur(80px)", bottom: "5%", right: -160 }} />
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? T.navBg : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? `1px solid ${T.navBorder}` : "none",
        transition: "background 0.3s, border-color 0.3s",
        padding: "14px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 700, color: T.textHeading }}>
          NVH<span style={{ color: T.accent }}>.</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navItems.map(item => (
            <a key={item} className={`nav-link${activeSection === item.toLowerCase() ? " active" : ""}`}
              href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
          {/* Light / Dark toggle */}
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Mobile theme toggle */}
          <button className="theme-toggle hamburger-btn" onClick={() => setDark(!dark)}
            style={{ display: "none" }} aria-label="Toggle theme">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: T.textHeading, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", top: 58, left: 0, right: 0, zIndex: 99,
              background: T.menuBg, borderBottom: `1px solid ${T.menuBorder}`,
              display: "flex", flexDirection: "column" }}>
            {navItems.map(item => (
              <a key={item} className="nav-link" href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ padding: "15px 24px", borderBottom: `1px solid ${T.menuItemBorder}`, fontSize: 13 }}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 40px 80px", width: "100%", position: "relative" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 16 }}>
                  Ha Noi, Vietnam · DevOps Engineer
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(48px, 6.5vw, 84px)", fontWeight: 700, lineHeight: 1.06, color: T.textHeading, marginTop: 0, marginBottom: 18 }}>
                Nguyễn<br /><em style={{ color: T.accent }}>Việt Hùng</em>
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>
                <div style={{ height: 1, width: 52, background: `linear-gradient(to right, ${T.accent}55, transparent)`, marginBottom: 18 }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, lineHeight: 1.9, color: T.textMuted, maxWidth: 410, marginBottom: 36, marginTop: 0 }}>
                  Highly capable of working independently as well as collaboratively.
                  Strong problem-solving skills with the ability to adapt quickly to changing tasks.
                  Open-minded, receptive to feedback, and growth-oriented.
                </p>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                  {[["2+", "Years"], ["4+", "Projects"], ["2", "Companies"]].map(([val, label]) => (
                    <div key={label}>
                      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 700, color: T.accent, lineHeight: 1 }}>{val}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textVeryFaint, marginTop: 5 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* HERO PHOTO */}
            <div className="hero-img-col" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ position: "relative" }}>
                <div style={{
                  width: 350, height: 460, borderRadius: 14,
                  border: `1px solid rgba(${T.accentR},0.22)`,
                  boxShadow: `0 32px 70px rgba(0,0,0,${dark ? 0.55 : 0.18})`,
                  background: T.heroBg,
                  overflow: "hidden", position: "relative"
                }}>
                  <img
                    src="/profile.jpg"
                    alt="Nguyen Viet Hung"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: T.heroOverlay }} />
                </div>
                {[
                  { text: "Kubernetes", pos: { top: 30, right: -52 }, anim: "float0", dur: "5.5s" },
                  { text: "Prometheus", pos: { bottom: 90, right: -60 }, anim: "float1", dur: "7s" },
                  { text: "Jenkins",    pos: { bottom: 30, left: -44 }, anim: "float2", dur: "6.5s" },
                ].map(({ text, pos, anim, dur }) => (
                  <div key={text} className="glass" style={{ position: "absolute", ...pos, padding: "8px 15px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.accent, animation: `${anim} ${dur} ease-in-out infinite` }}>
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.scrollLabel }}>Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown size={14} style={{ color: T.scrollChevron }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <FadeUp>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 14 }}>About</div>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(34px, 4vw, 56px)", fontWeight: 700, color: T.textHeading, lineHeight: 1.1, margin: 0 }}>
              Engineering<br /><em style={{ color: T.accent }}>reliable</em><br />systems.
            </h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, lineHeight: 1.9, color: T.textMuted, marginBottom: 18, marginTop: 0 }}>
              I'm a DevOps & System Engineer focused on cloud-native infrastructure, Kubernetes platforms, and production-grade observability.
              I work across the full stack — from container orchestration and CI/CD automation to database high availability and network security.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, lineHeight: 1.9, color: T.textMuted, marginBottom: 36, marginTop: 0 }}>
              My experience spans managing VMware vSphere environments, building centralized monitoring with Prometheus & Grafana,
              deploying AI-driven incident remediation systems, and collaborating with major telecom providers (Viettel, VinaPhone, MobiFone) on enterprise VAS infrastructure.
            </p>
            <div style={{ background: T.bgEdu, border: `1px solid ${T.borderEdu}`, borderRadius: 10, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>Education</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15.5, fontWeight: 600, color: T.textHeading }}>University of Engineering and Technology</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: T.textVeryFaint, marginTop: 4 }}>Vietnam National University · Computer Networking & Data Communications</div>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 30, fontWeight: 700, color: T.accent, lineHeight: 1 }}>3.34</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textVeryFaint, marginTop: 3 }}>GPA</div>
              </div>
            </div>
            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
              {[
                { num: 4, suffix: "+", label: "Projects" },
                { num: 2, suffix: "",  label: "Companies" },
                { num: 10, suffix: "+", label: "Tech Stack" },
                { num: 2, suffix: "+ yrs", label: "Experience" },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${T.borderStat}`, paddingLeft: 14 }}>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 30, fontWeight: 700, color: T.accent, lineHeight: 1 }}>
                    <Counter to={item.num} suffix={item.suffix} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.textVeryFaint, marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider-line" />

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 14 }}>Career</div>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, color: T.textHeading, lineHeight: 1.15, marginTop: 0, marginBottom: 52 }}>
            Work <em style={{ color: T.accent }}>Experience</em>
          </h2>
        </FadeUp>
        <div style={{ maxWidth: 780 }}>
          {EXPERIENCES.map((exp, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="exp-card" style={{ borderColor: exp.color + "48", paddingBottom: i < EXPERIENCES.length - 1 ? 36 : 20 }}>
                <div style={{ position: "absolute", left: -8, top: 26, width: 13, height: 13, borderRadius: "50%", background: exp.color, border: `2px solid ${T.bg}`, boxShadow: `0 0 10px ${exp.color}55` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 600, color: T.textHeading }}>{exp.role}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: exp.color, marginTop: 3 }}>{exp.company} · {exp.location}</div>
                    {exp.note && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.textVeryFaint, marginTop: 3, fontStyle: "italic" }}>{exp.note}</div>}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.textVeryFaint, background: T.bgPeriod, border: `1px solid ${T.borderPeriod}`, padding: "3px 11px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.7, color: T.textFaint }}>
                      <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* SKILLS */}
      <section id="skills" style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 14 }}>Expertise</div>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, color: T.textHeading, lineHeight: 1.15, marginTop: 0, marginBottom: 44 }}>
            Technical <em style={{ color: T.accent }}>Skills</em>
          </h2>
        </FadeUp>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <FadeUp key={i} delay={Math.floor(i / 2) * 0.09 + (i % 2) * 0.05}>
              <div className="skill-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: T.accent, flexShrink: 0 }}>{SKILL_ICONS[s.icon]}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.textHeading, letterSpacing: "0.03em" }}>{s.label}</span>
                </div>
                <div className="skill-tags">
                  {s.tags.map((t, j) => <span key={j} className="tag-pill">{t}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "110px 40px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 14 }}>Work</div>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, color: T.textHeading, lineHeight: 1.15, marginTop: 0, marginBottom: 44 }}>
            Selected <em style={{ color: T.accent }}>Projects</em>
          </h2>
        </FadeUp>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <FadeUp key={i} delay={Math.floor(i / 2) * 0.1 + (i % 2) * 0.05}>
              <div className="proj-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 26 }}>{p.emoji}</span>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tagColor, textDecoration: "none" }}>
                      Link <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17.5, fontWeight: 600, color: T.textHeading, margin: 0, lineHeight: 1.35 }}>{p.name}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((t, j) => <span key={j} className="tag-pill">{t}</span>)}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.78, color: T.textFaint, margin: 0, flexGrow: 1 }}>{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "110px 40px 120px", maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: 14 }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(36px, 5vw, 62px)", fontWeight: 700, color: T.textHeading, lineHeight: 1.1, marginTop: 0, marginBottom: 18 }}>
            Let's connect<br /><em style={{ color: T.accent }}>& collaborate.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.85, color: T.textFaint, marginBottom: 48, marginTop: 0 }}>
            Open to DevOps roles, infrastructure consulting, and interesting cloud-native projects.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {[
              { icon: <Mail size={15} />, label: "nguyenviethung21092003@gmail.com", href: "mailto:nguyenviethung21092003@gmail.com" },
              { icon: <Github size={15} />, label: "SeanNG21 / GitHub", href: "https://github.com/SeanNG21" },
              { icon: <Linkedin size={15} />, label: "hungnguyen21ng", href: "https://linkedin.com/in/hungnguyen21ng" },
              { icon: <Facebook size={15} />, label: "Facebook", href: "#" },
            ].map((item, i) => (
              <a key={i} className="contact-link" href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span style={{ color: T.accent, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
                <ArrowUpRight size={12} style={{ marginLeft: "auto", flexShrink: 0, opacity: 0.35 }} />
              </a>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${T.borderFooter}`, padding: "26px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17, fontWeight: 700, color: T.textHeading }}>NVH<span style={{ color: T.accent }}>.</span></div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.footerText, letterSpacing: "0.05em" }}>© 2025 Nguyễn Việt Hùng · Built with React & Framer Motion</div>
        <a href="#home" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.footerLink, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Back to top ↑</a>
      </footer>
    </div>
  );
}
