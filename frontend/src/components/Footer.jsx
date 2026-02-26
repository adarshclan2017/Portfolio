import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="foot">
      <div className="footInner">
        {/* Left Section */}
        <div className="footBrand">
          <h3 className="footTitle">
            <span className="footGrad">Adarsh IJ</span>
          </h3>
          <p className="footSub">
            MERN Stack Developer building modern full-stack applications.
          </p>

          <div className="footSocial">
            <a
              href="https://github.com/adarshclan2017"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github" />
            </a>

            <a
              href="https://www.linkedin.com/in/adarsh-i-j-14201a26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin" />
            </a>

            <a
              href="adarshclan2017@gmail.com"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope" />
            </a>
          </div>
        </div>

        {/* Middle Links */}
        <div className="footNav">
          <h4 className="footNavTitle">Quick Links</h4>
          <div className="footNavLinks">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
            <a href="/resume.pdf" download>
              Resume
            </a>
          </div>
        </div>

        {/* Right CTA */}
        <div className="footCTA">
          <h4 className="footNavTitle">Let’s Work Together</h4>
          <p className="footText">
            open to entry-level or junior React / MERN stack developer roles
          </p>

          <Link to="/contact" className="footBtn">
            Get In Touch
            <i className="fa-solid fa-arrow-right" />
          </Link>

          <button
            type="button"
            className="footTopBtn"
            onClick={scrollTop}
            aria-label="Back to top"
          >
            ↑ Back to top
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="footBottom">
        <span>© {new Date().getFullYear()} Adarsh IJ</span>
        <span className="footDivider">•</span>
        <span>Built with React & Node</span>
      </div>
    </footer>
  );
}