import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import "../styles/Contact.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

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

  const showErr = (field) => (submitted || touched[field]) && errors[field];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setSubmitted(true);
    setStatus({ type: "", text: "" });

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
      setTouched({ name: false, email: false, message: false });
      setSubmitted(false);
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
          <p className="cSub">Send a message </p>
        </div>

        <div className="cGrid">
          <form className="cCard" onSubmit={submit} noValidate>
            <div className="cField">
              <label className="cLabel" htmlFor="name">
                <i className="fa-solid fa-user" aria-hidden="true" />
                Name
              </label>
              <input
                id="name"
                className={`cInput ${showErr("name") ? "invalid" : ""}`}
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="name"
                required
              />
              {showErr("name") && <small className="cErr">{errors.name}</small>}
            </div>

            <div className="cField">
              <label className="cLabel" htmlFor="email">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Email
              </label>
              <input
                id="email"
                className={`cInput ${showErr("email") ? "invalid" : ""}`}
                name="email"
                type="email"
                placeholder="yourmail@gmail.com"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="email"
                required
              />
              {showErr("email") && <small className="cErr">{errors.email}</small>}
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
                className={`cTextarea ${showErr("message") ? "invalid" : ""}`}
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={onChange}
                onBlur={onBlur}
                rows={6}
                maxLength={500}
                required
              />
             
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

          {/* side card unchanged */}
           <div className="cSide">
            <div className="cSideCard">
              <h3 className="cSideTitle">Let’s build something</h3>
              <p className="cSideText">
               I’m open to entry-level or junior React / MERN stack developer roles. If you have a project or opportunity,
                send me a message and I’ll respond as soon as possible.
              </p>

              <div className="cInfo">
                <div className="cInfoRow">
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span>Tamil Nadu ,Kanniyakumari </span>
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
                <a className="cLinkBtn" href="https://github.com/adarshclan2017" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github" aria-hidden="true" />
                  GitHub
                </a>

                <a className="cLinkBtn" href="https://www.linkedin.com/in/adarsh-i-j-14201a26bhttps://www.linkedin.com/in/adarsh-i-j-14201a26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}