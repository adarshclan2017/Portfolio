import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  const navRef = useRef(null);

  // close menu on route change
  useEffect(() => {
    setMenu(false);
  }, [loc.pathname]);

  // close menu on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!menu) return;
      const root = navRef.current;
      if (!root) return;
      if (!root.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menu]);

  // close menu on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (!menu) return;
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const navLinkClass = useMemo(
    () => (isActive) => (isActive ? "active" : undefined),
    []
  );

  return (
    <header className="nav" ref={navRef}>
      <div className="navInner">
        <Link className="brand" to="/" aria-label="Go to home">
          <span className="brandDot" aria-hidden="true" />
          Adarsh IJ
        </Link>

        <nav
          id="primary-nav"
          className={`links ${menu ? "open" : ""}`}
          aria-label="Primary navigation"
        >
          <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Contact
          </NavLink>

          <a className="pill" href="/Adarsh IJ.pdf" download>
            Resume
          </a>

          <NavLink to="/admin-login" className="pill danger">
            Admin
          </NavLink>
        </nav>

        <button
          className="burger"
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menu}
          aria-controls="primary-nav"
        >
          {menu ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}