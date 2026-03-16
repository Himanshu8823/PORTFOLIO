"use client";
import { useEffect, useRef } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

const achievements = [
  { metric: "40%", desc: "Reduction in data fetch latency through optimized CMS architecture" },
  { metric: "35%", desc: "Improvement in page load speed via React Query caching and SSR" },
  { metric: "100%", desc: "Coverage of full-stack using MERN + Next.js + TypeScript" },
];

const highlights = [
  "Engineered modular, scalable CMS with real-time content synchronization",
  "Built full-stack solutions using MongoDB, Express.js, React.js, Node.js",
  "Implemented reusable components and optimized APIs",
  "Designed RESTful and GraphQL APIs with robust auth and error handling",
  "Enhanced UI/UX with server-side rendering and dynamic imports",
];

export default function Experience() {
  const r1 = useReveal();
  const r2 = useReveal(200);

  return (
    <section id="experience" style={{ padding: '120px 60px', background: 'rgba(5,13,24,0.6)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" ref={r1} style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Work History
          </h2>
          <div className="cyber-divider" style={{ marginTop: 16, maxWidth: 300 }} />
        </div>

        <div className="reveal" ref={r2} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left: Job card */}
          <div>
            <div className="glass-card" style={{
              padding: '36px',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(123,47,255,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 6 }}>FULL STACK DEVELOPER INTERN</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Levitation Infotech</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>Remote, India</div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  border: '1px solid rgba(0,240,255,0.2)',
                  background: 'rgba(0,240,255,0.05)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}>
                  Jul'25 – Jan'26
                </div>
              </div>

              <div className="cyber-divider" style={{ marginBottom: 20 }} />

              {/* Tech stack used */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.15em', marginBottom: 10, textTransform: 'uppercase' }}>Tech Stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Next.js', 'TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'GraphQL', 'TanStack Query'].map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {achievements.map(a => (
                  <div key={a.metric} style={{
                    padding: '12px 8px',
                    border: '1px solid rgba(0,240,255,0.1)',
                    background: 'rgba(0,240,255,0.03)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>{a.metric}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>{a.desc.split(' ').slice(0, 4).join(' ')}...</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Highlights list */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 20, textTransform: 'uppercase' }}>
              Key Responsibilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {highlights.map((h, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'; (e.currentTarget as HTMLElement).style.background = 'var(--glass)'; }}
                >
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', flexShrink: 0, marginTop: 1 }}>▸</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(232,244,248,0.7)', lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Education mini-timeline */}
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 20, textTransform: 'uppercase' }}>
                Education
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', paddingLeft: 20 }}>
                <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: 'linear-gradient(180deg, var(--accent), rgba(0,240,255,0.1))' }} />
                {[
                  { school: 'G.H. Raisoni College', degree: 'B.Tech CSE (AI & ML)', period: 'Sep 2024 – Jul 2027', grade: 'CGPA: 8.83/10' },
                  { school: "GF's Godavari College", degree: 'Diploma — Computer Engineering', period: 'Sep 2022 – Jul 2024', grade: '91.31%' },
                ].map((e, i) => (
                  <div key={i} style={{ paddingLeft: 16, paddingBottom: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -14, top: 6, width: 10, height: 10, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--muted)', boxShadow: i === 0 ? '0 0 10px var(--accent)' : 'none' }} />
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{e.school}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(232,244,248,0.5)', marginBottom: 4 }}>{e.degree}</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{e.period}</span>
                      <span className="tag" style={{ fontSize: '0.58rem' }}>{e.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
