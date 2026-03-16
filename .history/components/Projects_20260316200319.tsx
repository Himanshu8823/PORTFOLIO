"use client";
import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => el.classList.add("visible"), delay);
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingTiltRef = useRef({ x: 0, y: 0 });
  const hasGithub = typeof project.github === 'string' && project.github.trim() !== '' && project.github !== '#';

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    pendingTiltRef.current = { x: dy * -5, y: dx * 5 };

    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      setTilt(pendingTiltRef.current);
      rafRef.current = null;
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
      className="hover-target"
      style={{
        perspective: 800,
        cursor: 'none',
        willChange: 'transform',
      }}
    >
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 6 : 0}px)`,
        transition: 'transform 0.24s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}>
        <div className="glass-card" style={{
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          borderColor: hovered ? project.color.replace(')', ', 0.4)').replace('rgb', 'rgba') : 'var(--glass-border)',
          transition: 'border-color 0.3s',
        }}>
          {/* Color splash */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.accentBg} 0%, transparent 70%)`,
            transition: 'opacity 0.3s',
            opacity: hovered ? 1 : 0.5,
            pointerEvents: 'none',
          }} />

          {/* Number */}
          <div style={{
            position: 'absolute', top: 20, right: 28,
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.04)',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: project.color, letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
              {project.type}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: 'var(--text)', lineHeight: 1.3, marginBottom: 8,
            }}>
              {project.title}
            </h3>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7,
            color: 'rgba(232,244,248,0.6)', marginBottom: 20,
          }}>
            {project.desc}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: 20 }}>
            {project.highlights.map((h: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <span style={{ color: project.color, fontSize: '0.7rem', marginTop: 3, flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(232,244,248,0.55)', lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {project.tech.map((t: string) => (
              <span key={t} className="tag" style={{ borderColor: `${project.color.replace(')', ', 0.3)').replace('rgb', 'rgba')}`, color: project.color }}>
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={project.demo || '#'} target="_blank" className="hover-target" style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
              padding: '8px 20px',
              border: `1px solid ${project.color}`,
              color: project.color, textDecoration: 'none',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              transition: 'background 0.3s',
              background: hovered ? `${project.color.replace(')', ', 0.1)').replace('rgb', 'rgba')}` : 'transparent',
            }}>
              Demo →
            </a>
            {hasGithub && (
              <a href={project.github} target="_blank" className="hover-target" style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
                padding: '8px 20px',
                border: '1px solid rgba(74,96,112,0.4)',
                color: 'var(--muted)', textDecoration: 'none',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}>
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "GHRhack 2.0 — Official Website",
    type: "Full Stack / Real-Time Platform",
    desc: "The live official hackathon platform for our college GHRhack 2.0, built as a full-stack system for participant onboarding, team login, problem statement selection, and event operations.",
    highlights: [
      "Custom authentication flow for teams to login securely",
      "Real-time problem statement selection workflow with TanStack Query mutations",
      "Next.js + MongoDB architecture with immersive GSAP-powered UI",
    ],
    tech: ['Next.js', 'MongoDB', 'shadcn/ui', 'GSAP', 'TanStack Query', 'Custom Authentication'],
    color: 'rgb(255, 60, 172)',
    accentBg: 'rgba(255,60,172,0.1)',
    demo: 'https://ghrhack.tech',
    github: 'https://github.com/Himanshu8823/GHR-Hack-2.0',
  },
  {
    title: "MultiVendor Ordering & POS Platform",
    type: "Full Stack Application",
    desc: "A comprehensive restaurant management platform enabling customers to search restaurants, order food, and book tables — with a powerful POS system for restaurant owners.",
    highlights: [
      "Role-based POS system (owner/manager/cashier/waiter)",
      "Real-time order sync between website and POS",
      "Dynamic inventory management and sales analytics",
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'REST APIs'],
    color: 'rgb(0, 240, 255)',
    accentBg: 'rgba(0,240,255,0.1)',
    demo: '#',
    github: 'https://github.com/Himanshu8823/Restaurant',
  },
  {
    title: "AI-Powered Recipe Generator",
    type: "AI / Web Application",
    desc: "A personalized nutrition platform that generates intelligent recipe recommendations using AI with filters for calories, allergies, and cuisines.",
    highlights: [
      "Reduced food waste by 25% via ingredient-matching algorithms",
      "Personalized filters for calories, allergies, cuisines",
      "MySQL favorites system for user preferences",
    ],
    tech: ['Python', 'Flask', 'MySQL', 'Spoonacular API'],
    color: 'rgb(123, 47, 255)',
    accentBg: 'rgba(123,47,255,0.1)',
    demo: '#',
    github: 'https://github.com/Himanshu8823/Recipe-Generator',
  },
  {
    title: "Student Information Management",
    type: "High Priority / Management System",
    desc: "A comprehensive web-based Student Information Management System (SIMS) for handling student records, data workflows, and administration tasks efficiently.",
    highlights: [
      "Structured student data management and retrieval",
      "Admin-focused workflows for day-to-day operations",
      "Reliable CRUD architecture with clean UI patterns",
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'AJAX', 'PHP', 'MySQL'],
    color: 'rgb(123, 47, 255)',
    accentBg: 'rgba(123,47,255,0.1)',
    demo: 'https://youtu.be/XcW8Z0bnXJk',
    github: 'https://github.com/Himanshu8823/Student-Information-Management',
  },
  {
    title: "Dairy Farm Management System",
    type: "High Priority / Management System",
    desc: "A comprehensive web platform for managing dairy farm operations including records, processes, and daily management tasks with better operational visibility.",
    highlights: [
      "Streamlined farm record and operations management",
      "Web-based modules for easier monitoring and control",
      "Consistent database-driven workflows with secure access",
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'AJAX', 'PHP', 'MySQL'],
    color: 'rgb(255, 60, 172)',
    accentBg: 'rgba(255,60,172,0.1)',
    demo: 'https://youtu.be/IveoxkwwnIg',
    github: '#',
  },
  {
    title: "College Events Management System",
    type: "Web Platform",
    desc: "A web-based platform to streamline college event planning, registration, and communication with real-time tracking and automated notifications.",
    highlights: [
      "Event planning and registration workflow",
      "Real-time tracking and automated notifications",
      "AI-powered registration bot for better engagement",
    ],
    tech: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS'],
    color: 'rgb(123, 47, 255)',
    accentBg: 'rgba(123,47,255,0.1)',
    demo: 'https://youtu.be/LbjFbXHxvbQ',
    github: '#',
  },
  {
    title: "Smart Calorie Calculator",
    type: "Health / Utility App",
    desc: "A user-centered web application that helps individuals monitor and manage daily caloric intake based on personalized fitness and health goals.",
    highlights: [
      "Personalized calorie goal calculation",
      "Daily intake monitoring",
      "Simple workflow focused on user habits",
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'Python'],
    color: 'rgb(255, 60, 172)',
    accentBg: 'rgba(255,60,172,0.1)',
    demo: 'https://youtu.be/fZzps_MKOZY',
    github: '#',
  },
  {
    title: "NotePad Clone",
    type: "Desktop Utility",
    desc: "A lightweight text editor application developed to replicate the core functionalities of Windows Notepad for fast and minimal text editing.",
    highlights: [
      "Core notepad editing functionality",
      "Lightweight and fast UI",
      "Minimal and focused desktop utility experience",
    ],
    tech: ['Java', 'Desktop UI'],
    color: 'rgb(0, 240, 255)',
    accentBg: 'rgba(0,240,255,0.1)',
    demo: 'https://youtu.be/_uGpxHnVkS0',
    github: '#',
  },
  {
    title: "TIC TAC TOE GAME Android",
    type: "Android Application",
    desc: "A simple Android app that allows two players to play Tic Tac Toe with winning condition detection, draw detection, and turn switching.",
    highlights: [
      "Two-player gameplay on mobile",
      "Winning and draw condition logic",
      "Clean and intuitive interface",
    ],
    tech: ['Android', 'Java', 'XML'],
    color: 'rgb(123, 47, 255)',
    accentBg: 'rgba(123,47,255,0.1)',
    demo: 'https://youtu.be/Mdg6ahAGyZc',
    github: '#',
  },
  {
    title: "Tourism Website",
    type: "Web Platform",
    desc: "A fully functional tourism platform designed to showcase travel destinations, promote tourism services, and help users plan their trips.",
    highlights: [
      "Destination and service showcase",
      "Trip planning focused UX",
      "Structured and scalable website modules",
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    color: 'rgb(255, 60, 172)',
    accentBg: 'rgba(255,60,172,0.1)',
    demo: 'https://youtu.be/fZzps_MKOZY',
    github: '#',
  },
  {
    title: "Music Recommender System",
    type: "Machine Learning",
    desc: "An intelligent application that suggests songs based on user preferences, listening history, or mood using data-driven filtering techniques.",
    highlights: [
      "Personalized recommendation engine",
      "Preference and behavior-based suggestions",
      "Improved discovery and user engagement",
    ],
    tech: ['Python', 'Machine Learning', 'Data Processing'],
    color: 'rgb(0, 240, 255)',
    accentBg: 'rgba(0,240,255,0.1)',
    demo: 'https://youtu.be/D4axqW6R6RA',
    github: '#',
  },
  {
    title: "Medical Assistance Using OCR",
    type: "AI / OCR Application",
    desc: "A medical assistance project that uses Optical Character Recognition to extract text from prescriptions and reports for faster digitization and support workflows.",
    highlights: [
      "OCR-based text extraction from medical documents",
      "Digitization support for handwritten content",
      "Actionable medical information flow from extracted data",
    ],
    tech: ['Python', 'OCR', 'Machine Learning', 'Flask'],
    color: 'rgb(123, 47, 255)',
    accentBg: 'rgba(123,47,255,0.1)',
    demo: 'https://youtu.be/D4axqW6R6RA',
    github: '#',
  },
];

export default function Projects() {
  const r1 = useReveal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const primaryProjectCount = 6;
  const visibleProjects = showAllProjects ? projects : projects.slice(0, primaryProjectCount);
  const hasMoreProjects = projects.length > primaryProjectCount;

  return (
    <section id="projects" style={{ padding: '120px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" ref={r1} style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Featured Work
          </h2>
          <div className="cyber-divider" style={{ marginTop: 16, maxWidth: 300 }} />
          <p style={{ marginTop: 16, fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(232,244,248,0.5)', maxWidth: 500 }}>
            A selection of projects that showcase my engineering skills and problem-solving approach.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {visibleProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {hasMoreProjects && (
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn-primary hover-target"
              onClick={() => setShowAllProjects(v => !v)}
              style={{ fontSize: '0.72rem' }}
            >
              {showAllProjects ? 'Show Less Projects' : 'More Projects'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
