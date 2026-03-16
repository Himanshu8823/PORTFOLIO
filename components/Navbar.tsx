"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["about", "experience", "projects", "skills", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 40px',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(2,4,8,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,240,255,0.08)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <a href="#" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        fontWeight: 700,
        color: 'var(--accent)',
        textDecoration: 'none',
        letterSpacing: '0.1em',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{
          width: 32, height: 32,
          border: '1px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 800,
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          background: 'rgba(0,240,255,0.08)',
        }}>HK</span>
        <span style={{ color: 'var(--text)', fontWeight: 400 }}>Himanshu</span>
        <span>Kawale</span>
      </a>

      {/* Desktop Links */}
      <ul style={{
        display: 'flex', gap: 36, listStyle: 'none',
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em',
      }} className="desktop-nav">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}
              style={{
                color: active === l.href.slice(1) ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = active === l.href.slice(1) ? 'var(--accent)' : 'var(--muted)')}
            >
              {active === l.href.slice(1) && (
                <span style={{
                  position: 'absolute', bottom: -4, left: 0, right: 0, height: 1,
                  background: 'var(--accent)',
                }} />
              )}
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#contact" className="btn-primary hover-target" style={{ fontSize: '0.7rem', padding: '8px 20px' }}>
        Hire Me
      </a>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
