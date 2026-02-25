import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import "../styles/Contact.css"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" }); // success | error
  const [loading, setLoading] = useState(false);

  // small UX: auto-clear success after a few seconds
  useEffect(() => {
    if (status.type !== "success") return;
    const t = setTimeout(() => setStatus({ type: "", text: "" }), 4000);
    return () => clearTimeout(t);
  }, [status.type]);

  const messageCount = form.message.length;

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  }, [form]);

  const canSend = Object.keys(errors).length === 0 && !loading;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setStatus({ type: "", text: "" });

    // final validation before submit
    if (Object.keys(errors).length) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setLoading(true);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setStatus({ type: "success", text: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to send. Please try again.";
      setStatus({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cWrap">
      <div className="cContainer">
        <div className="cHead">
          <h2 className="cTitle">Contact</h2>
          <p className="cSub">Send a message (it will be saved in MongoDB).</p>
        </div>

        <div className="cGrid">
          {/* Form */}
          <form className="cCard" onSubmit={submit} noValidate>
            <div className="cField">
              <label className="cLabel" htmlFor="name">
                <i className="fa-solid fa-user" aria-hidden="true" />
                Name
              </label>
              <input
                id="name"
                className={`cInput ${errors.name ? "invalid" : ""}`}
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
              />
              {errors.name && <small className="cErr">{errors.name}</small>}
            </div>

            <div className="cField">
              <label className="cLabel" htmlFor="email">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Email
              </label>
              <input
                id="email"
                className={`cInput ${errors.email ? "invalid" : ""}`}
                name="email"
                type="email"
                placeholder="yourmail@gmail.com"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                required
              />
              {errors.email && <small className="cErr">{errors.email}</small>}
            </div>

            <div className="cField">
              <div className="cRow">
                <label className="cLabel" htmlFor="message">
                  <i className="fa-solid fa-message" aria-hidden="true" />
                  Message
                </label>
                <span className="cCount">{messageCount}/500</span>
              </div>

              <textarea
                id="message"
                className={`cTextarea ${errors.message ? "invalid" : ""}`}
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={onChange}
                rows={6}
                maxLength={500}
                required
              />
              {errors.message ? (
                <small className="cErr">{errors.message}</small>
              ) : (
                <small className="cHelp">Include what you need, timeline, and any links.</small>
              )}
            </div>

            <button className="cBtn" disabled={!canSend}>
              {loading ? "Sending..." : "Send Message"}
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            </button>

            {status.text && (
              <div className={`cStatus ${status.type}`}>
                <i
                  className={`fa-solid ${
                    status.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"
                  }`}
                  aria-hidden="true"
                />
                <span>{status.text}</span>
              </div>
            )}
          </form>

          {/* Side card */}
          <div className="cSide">
            <div className="cSideCard">
              <h3 className="cSideTitle">Let’s build something</h3>
              <p className="cSideText">
                I’m open to internships and junior roles. If you have a project or opportunity,
                send me a message and I’ll respond as soon as possible.
              </p>

              <div className="cInfo">
                <div className="cInfoRow">
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span>India</span>
                </div>
                <div className="cInfoRow">
                  <i className="fa-solid fa-code" aria-hidden="true" />
                  <span>React • Node • Express • MongoDB</span>
                </div>
                <div className="cInfoRow">
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                  <span>JWT Auth • Admin Panels • REST APIs</span>
                </div>
              </div>

              <div className="cLinks">
                <a className="cLinkBtn" href="https://github.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github" aria-hidden="true" />
                  GitHub
                </a>

                <a className="cLinkBtn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>

              <p className="cHint">Tip: Replace GitHub & LinkedIn with your real URLs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}