import React from "react";
import "../styles/About.css";

const Section = ({ title, subtitle, icon, children, right }) => (
  <section className="abSection">
    <div className="abSectionHead">
      <div className="abHeadLeft">
        <h3 className="abH3">
          {icon && <i className={`abIcon ${icon}`} aria-hidden="true" />}
          {title}
        </h3>
        {subtitle && <p className="abSub">{subtitle}</p>}
      </div>
      {right && <div className="abHeadRight">{right}</div>}
    </div>
    {children}
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`abCard ${className}`}>{children}</div>
);

const Pill = ({ text, icon }) => (
  <span className="abPill">
    {icon && <i className={`abPillIcon ${icon}`} aria-hidden="true" />}
    {text}
  </span>
);

const SkillRow = ({ name, level = 60, tag = "Intermediate" }) => (
  <div className="abSkill">
    <div className="abSkillTop">
      <b>{name}</b>
      <span className="abTag">{tag}</span>
    </div>
    <div className="abBar" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
      <div className="abFill" style={{ width: `${Math.max(0, Math.min(100, level))}%` }} />
    </div>
  </div>
);

const TimelineItem = ({ title, date, points = [] }) => (
  <div className="abTimelineItem">
    <div className="abTimelineTop">
      <b>{title}</b>
      <span className="abDate">{date}</span>
    </div>
    <ul className="abList">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

export default function About() {
  const quick = [
    "MERN Stack Developer (React + Node + MongoDB)",
    "Builds admin panels + CRUD + authentication",
    "Focus: clean UI + API integration",
    "Goal: Junior / Intern role",
  ];

  const strengths = [
    ["UI building", "fa-solid fa-palette"],
    ["React Router", "fa-solid fa-route"],
    ["Axios API calls", "fa-solid fa-cloud-arrow-up"],
    ["Auth (JWT)", "fa-solid fa-shield-halved"],
    ["MongoDB CRUD", "fa-solid fa-database"],
    ["Admin panel", "fa-solid fa-table-columns"],
    ["Git/GitHub", "fa-brands fa-github"],
    ["Bug fixing", "fa-solid fa-wand-magic-sparkles"],
  ];

  return (
    <div className="abWrap">
      {/* Background */}
      <div className="abBg" aria-hidden="true">
        <span className="abOrb a1" />
        <span className="abOrb a2" />
        <span className="abOrb a3" />
        <span className="abGrid" />
      </div>

      {/* Header */}
      <header className="abHeader">
        <div className="abBadge">
          <span className="abDot" />
          Open to opportunities
        </div>

        <h2 className="abTitle">
          About <span className="abGrad">Me</span>
        </h2>

        <p className="abPara">
          I’m <b>Adarsh IJ</b>, React js / MERN Stack Developer. I enjoy building real-world
          full-stack projects with responsive UI, REST APIs, admin dashboards and
          clean folder structure. I’m currently improving deployment and best practices
          to make production-ready apps.
        </p>

        <div className="abHeaderRow">
          <div className="abProfile">
            <div className="abAvatar" aria-hidden="true">
              <span>A</span>
            </div>
            <div>
              <div className="abName">Adarsh IJ</div>
              <div className="abRole"> React js /MERN Full-Stack Developer</div>
            </div>
          </div>

          <div className="abHeaderBtns">
            <a className="abBtnPrimary" href="/Adarsh IJ.pdf" download>
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download Resume
            </a>
            <a className="abBtnSoft" href="/projects">
              <i className="fa-solid fa-layer-group" aria-hidden="true" />
              View Projects
            </a>
          </div>
        </div>
      </header>

      {/* Top Summary */}
      <div className="abGrid2">
        <Card className="abGlow">
          <div className="abCardTitle">
            <i className="fa-solid fa-bolt" aria-hidden="true" />
            Quick Summary
          </div>
          <ul className="abList">
            {quick.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <div className="abMiniStats">
            <div className="abStat">
              <div className="abStatNum">5+</div>
              <div className="abStatLabel">Projects</div>
            </div>
            <div className="abStat">
              <div className="abStatNum">3+</div>
              <div className="abStatLabel">Dashboards</div>
            </div>
            <div className="abStat">
              <div className="abStatNum">JWT</div>
              <div className="abStatLabel">Auth</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="abCardTitle">
            <i className="fa-solid fa-star" aria-hidden="true" />
            Strengths
          </div>

          <div className="abPills">
            {strengths.map(([t, ic]) => (
              <Pill key={t} text={t} icon={ic} />
            ))}
          </div>

          <div className="abCallout">
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
            <span>
              I enjoy building <b>clean UI</b>, integrating <b>APIs</b>, and creating{" "}
              <b>admin dashboards</b> with real features.
            </span>
          </div>
        </Card>
      </div>

      {/* Skills */}
      <Section
        title="Skills"
        icon="fa-solid fa-chart-simple"
      >
        <div className="abGrid3">
          <Card>
            <div className="abCardTitle">
              <i className="fa-solid fa-desktop" aria-hidden="true" />
              Frontend
            </div>
            <div className="abStack">
              <SkillRow name="React" level={72} tag="Intermediate" />
              <SkillRow name="React Router" level={75} tag="Strong" />
              <SkillRow name="Vite" level={70} tag="Intermediate" />
              <SkillRow name="HTML / CSS" level={78} tag="Strong" />
            </div>
          </Card>

          <Card>
            <div className="abCardTitle">
              <i className="fa-solid fa-server" aria-hidden="true" />
              Backend
            </div>
            <div className="abStack">
              <SkillRow name="Node.js" level={68} tag="Intermediate" />
              <SkillRow name="Express" level={72} tag="Intermediate" />
              <SkillRow name="REST API" level={76} tag="Strong" />
              <SkillRow name="JWT Auth" level={66} tag="Intermediate" />
            </div>
          </Card>

          <Card>
            <div className="abCardTitle">
              <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true" />
              Database & Tools
            </div>
            <div className="abStack">
              <SkillRow name="MongoDB" level={70} tag="Intermediate" />
              <SkillRow name="Mongoose" level={66} tag="Intermediate" />
              <SkillRow name="Git / GitHub" level={74} tag="Strong" />
              <SkillRow name="Deployment (Learning)" level={40} tag="Learning" />
            </div>
          </Card>
        </div>
      </Section>

      {/* Timeline */}
      <Section
        title="Timeline"
        icon="fa-solid fa-timeline"
      >
        <div className="abStack">
          <Card className="abTimeline">
            <TimelineItem
              title="MERN Portfolio (Admin + CRUD + Upload)"
              date="2026"
              points={[
                "Built portfolio with admin login (JWT) and protected routes.",
                "Projects stored in MongoDB and fetched via Express API.",
                "Added project image upload (Cloudinary) + edit/delete.",
                "Used Vite proxy for clean API calls without hardcoded URLs.",
              ]}
            />
          </Card>

          <Card className="abTimeline">
            <TimelineItem
              title="React Projects (UI + API Integration)"
              date="2025"
              points={[
                "Built UI pages with forms, validations and state handling.",
                "Worked with APIs using fetch/axios and error handling.",
                "Improved folder structure and component reusability.",
              ]}
            />
          </Card>
          <Card className="abTimeline">
            <TimelineItem
              title="Multi-Vendor E-Commerce Platform (MERN Stack)"
              date="2025"
              points={[
                "Developed a full-stack multi-vendor marketplace using React, Node, Express, and MongoDB.",
                "Implemented vendor registration, product management, and admin approval system.",
                "Built secure authentication with JWT and protected routes for admin and vendors.",
                "Integrated cart, order management, and dynamic product filtering features.",
                "Handled product image uploads using Multer middleware and managed server-side storage.",
              ]}
            />
          </Card>

          <Card className="abTimeline">
            <TimelineItem
              title="Currently Improving"
              date="Now"
              points={[
                "Optimizing MERN applications for performance and clean architecture.",
                "Improving authentication flows (JWT, role-based access control).",
                "Handling production deployment issues (CORS, env variables, API configs).",
                "Writing cleaner reusable components and better folder structure.",
                "Strengthening backend error handling and validation logic.",
              ]}
            />
          </Card>
        </div>
      </Section>

      {/* Resume + Links */}
      <Section
        title="Resume & Links"
        icon="fa-solid fa-paperclip"
      >
        <div className="abGrid2">
          <Card>
            <div className="abCardTitle">
              <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
              Resume
            </div>


            <a className="abBtnPrimary" href="/Adarsh IJ.pdf" download>
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download Resume
            </a>
          </Card>

          <Card>
            <div className="abCardTitle">
              <i className="fa-solid fa-share-nodes" aria-hidden="true" />
              Social Links
            </div>

            <div className="abBtns">
              <a className="abBtnSoft" href="https://github.com/adarshclan2017" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github" aria-hidden="true" />
                GitHub
              </a>
              <a className="abBtnSoft" href="https://www.linkedin.com/in/adarsh-i-j-14201a26bhttps://www.linkedin.com/in/adarsh-i-j-14201a26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* What you want */}
      <Section
        title="What I’m Looking For"
        icon="fa-solid fa-briefcase"
      >
        <Card className="abBig">
          <p className="abPara2">
            I’m looking for a <b>Junior MERN / React Developer</b> role where I can work on real projects,
            learn from seniors, and improve my backend + deployment skills. I can contribute strongly in UI
            development, API integration, and CRUD features.
          </p>
        </Card>
      </Section>


    </div>
  );
}