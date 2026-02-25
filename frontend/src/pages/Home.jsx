import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const CHIPS = ["React", "Vite", "Node", "Express", "MongoDB", "JWT Auth", "REST APIs"];

const SIDE_HIGHLIGHTS = [
  { icon: "⚡", title: "Fast UI", desc: "Optimized components & clean code" },
  { icon: "🔒", title: "Secure", desc: "JWT auth, protected routes, best practices" },
  { icon: "🧩", title: "Scalable", desc: "Reusable UI + structured API layers" },
];

const GRID_CARDS = [
  { icon: "⚡", title: "Fast", desc: "Optimized UI, lazy loading, and clean component design." },
  { icon: "🛡️", title: "Secure", desc: "JWT admin login, protected routes, validation, and safe APIs." },
  { icon: "📱", title: "Responsive", desc: "Modern layouts that look great on desktop, tablet & mobile." },
  { icon: "🧠", title: "Clean UX", desc: "Simple flows, clear UI states, and polished interactions." },
];




export default function Home() {
  return (
    <section className="home">
      {/* Background Orbs */}
      <div className="bgOrbs" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
      </div>

      <div className="homeInner">
        {/* HERO */}
        <div className="heroWrap">
          {/* LEFT HERO */}
          <div className="hero">
            <div className="badge">
              <span className="dot" />
              Available for opportunities
            </div>

            <h1>
              Hi, I’m <span className="grad">Adarsh</span>{" "}
              <span className="waveWrap">
                <span className="waveHand">👋</span>
              </span>
            </h1>
            
            <p className="subtitle">
              MERN Stack Developer building modern websites, admin dashboards, and APIs using{" "}
              <b>React</b>, <b>Node.js</b>, <b>Express</b>, and <b>MongoDB</b>. I focus on clean UI,
              performance, and secure backend practices.
            </p>

            {/* CTA */}
            <div className="ctaRow">
              <a className="btn btnPrimary" href="/Adarsh IJ.pdf" download>
                Download Resume <span className="btnIcon" aria-hidden="true">↓</span>
              </a>

              <Link className="btn btnGhost" to="/projects">
                View Projects <span className="btnIcon" aria-hidden="true">→</span>
              </Link>

              <Link className="btn btnGhost" to="/contact">
                Contact <span className="btnIcon" aria-hidden="true">✉</span>
              </Link>
            </div>

            {/* Chips */}
            <div className="chips">
              {CHIPS.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <aside className="heroCard">
            <div className="heroCardTop">
              <div className="avatar" aria-hidden="true">
                <span>A</span>
              </div>
              <div>
                <div className="name">Adarsh</div>
                <div className="role">Full-Stack Developer</div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats">
              <div className="stat">
                <div className="statNum">10+</div>
                <div className="statLabel">Projects</div>
              </div>
              <div className="stat">
                <div className="statNum">3+</div>
                <div className="statLabel">Dashboards</div>
              </div>
              <div className="stat">
                <div className="statNum">Fast</div>
                <div className="statLabel">Performance</div>
              </div>
            </div>

            <div className="divider" />

            {/* Side Highlights */}
            <div className="highlights">
              {SIDE_HIGHLIGHTS.map((h) => (
                <div className="hl" key={h.title}>
                  <span className="hlIcon" aria-hidden="true">{h.icon}</span>
                  <div>
                    <b>{h.title}</b>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* FEATURE GRID */}
        <div className="grid">
          {GRID_CARDS.map((card) => (
            <div className="miniCard" key={card.title}>
              <div className="miniTop">
                <span className="miniIcon" aria-hidden="true">{card.icon}</span>
                <b>{card.title}</b>
              </div>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}