import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, authApi } from "../api/api";
import "../styles/Admin.css";

export default function AdminDashboard() {
  const nav = useNavigate();
  const adminApi = useMemo(() => authApi(), []);

  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);

  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filters
  const [projectQuery, setProjectQuery] = useState("");
  const [messageQuery, setMessageQuery] = useState("");
  const [projectSort, setProjectSort] = useState("newest"); // newest | oldest | az

  // ✅ Modern toast (auto hide + type)
  const [toast, setToast] = useState({ show: false, type: "success", text: "" });
  const toastTimer = useRef(null);

  const showToast = (text, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ show: true, type, text });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  };

  const hideToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast((t) => ({ ...t, show: false }));
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const safe401 = (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("admin_token");
      nav("/admin-login");
      return true;
    }
    return false;
  };

  const reset = () => {
    setEditingId(null);
    setFile(null);
    setForm({ title: "", description: "", tech: "", github: "", demo: "", image: "" });
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    image: "",
  });

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data || []);
    } catch {
      setProjects([]);
      showToast("Failed to load projects", "error");
    } finally {
      setLoadingProjects(false);
    }
  };

  const loadMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await adminApi.get("/contact");
      setMessages(res.data || []);
    } catch (e) {
      if (!safe401(e)) {
        setMessages([]);
        showToast("Failed to load messages", "error");
      }
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      nav("/admin-login");
      return;
    }
    loadProjects();
    loadMessages();
    // eslint-disable-next-line
  }, []);

  const saveProject = async (e) => {
    e.preventDefault();
    hideToast();
    setSaving(true);

    try {
      let imageUrl = (form.image || "").trim();

      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        const up = await adminApi.post("/upload", fd);
        imageUrl = up.data?.url || imageUrl;
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        tech: form.tech.trim(),
        github: (form.github || "").trim(),
        demo: (form.demo || "").trim(),
        image: imageUrl,
      };

      if (editingId) {
        await adminApi.put(`/projects/${editingId}`, payload);
        showToast("Project updated ", "success");
      } else {
        await adminApi.post("/projects", payload);
        showToast("Project added ", "success");
      }

      reset();
      await loadProjects();
    } catch (err) {
      if (safe401(err)) return;
      showToast(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Save failed ❌",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p) => {
    hideToast();
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      tech: p.tech || "",
      github: p.github || "",
      demo: p.demo || p.live || p.link || "",
      image: p.image || "",
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (id) => {
    hideToast();
    try {
      await adminApi.delete(`/projects/${id}`);
      // ✅ removes "unwanted text" by using toast only (no extra UI text)
      showToast("Project deleted ", "success");
      await loadProjects();
    } catch (err) {
      if (safe401(err)) return;
      showToast(err.response?.data?.message || "Delete failed ", "error");
    }
  };

  const deleteMessage = async (id) => {
    hideToast();
    try {
      await adminApi.delete(`/contact/${id}`);
      showToast("Message deleted ", "success");
      await loadMessages();
    } catch (err) {
      if (safe401(err)) return;
      showToast("Delete failed ❌", "error");
    }
  };

  const clearMessages = async () => {
    hideToast();
    try {
      await adminApi.delete("/contact");
      showToast("All messages cleared ", "success");
      await loadMessages();
    } catch (err) {
      if (safe401(err)) return;
      showToast("Clear failed ", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    nav("/admin-login");
  };

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [messages]);

  const viewProjects = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    let list = [...projects];

    if (q) {
      list = list.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const tech = (p.tech || "").toLowerCase();
        return title.includes(q) || tech.includes(q);
      });
    }

    if (projectSort === "az") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (projectSort === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    } else {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [projects, projectQuery, projectSort]);

  const viewMessages = useMemo(() => {
    const q = messageQuery.trim().toLowerCase();
    if (!q) return sortedMessages;

    return sortedMessages.filter((m) => {
      const name = (m.name || "").toLowerCase();
      const email = (m.email || "").toLowerCase();
      const msg = (m.message || "").toLowerCase();
      return name.includes(q) || email.includes(q) || msg.includes(q);
    });
  }, [sortedMessages, messageQuery]);

  return (
    <section className="adminPage">
      <div className="adminWrap">
        {/* Top Bar */}
        <header className="adminTop">
          <div className="titleBlock">
            <h1>Admin</h1>
            <p className="muted">Manage projects & messages</p>
          </div>

          <div className="actions">
            <button
              className="btn ghost"
              onClick={loadProjects}
              disabled={loadingProjects}
              title="Refresh projects"
            >
              {loadingProjects ? "Refreshing..." : "Refresh Projects"}
            </button>

            <button
              className="btn ghost"
              onClick={loadMessages}
              disabled={loadingMessages}
              title="Refresh messages"
            >
              {loadingMessages ? "Refreshing..." : "Refresh Messages"}
            </button>

            <button className="btn danger" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {/* ✅ Toast */}
        {toast.show && (
          <div className={`toast ${toast.type}`}>
            <span>{toast.text}</span>
            <button className="toastX" onClick={hideToast} aria-label="Close">
              ✕
            </button>
          </div>
        )}

        {/* Stats */}
        <section className="statsRow">
          <div className="stat">
            <div className="statLabel">Projects</div>
            <div className="statValue">{projects.length}</div>
          </div>
          <div className="stat">
            <div className="statLabel">Messages</div>
            <div className="statValue">{messages.length}</div>
          </div>
        </section>

        <div className="gridMain">
          {/* Left: Add/Edit */}
          <section className="panel">
            <div className="panelHead">
              <h2>{editingId ? "Edit Project" : "Add Project"}</h2>
              {editingId && (
                <button className="btn ghost" onClick={reset}>
                  Cancel
                </button>
              )}
            </div>

            <form className="form" onSubmit={saveProject}>
              <div className="row2">
                <label className="field">
                  <span>Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </label>

                <label className="field">
                  <span>Tech</span>
                  <input
                    value={form.tech}
                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                    required
                  />
                </label>
              </div>

              <label className="field">
                <span>Description</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </label>

              <div className="row2">
                <label className="field">
                  <span>GitHub</span>
                  <input
                    value={form.github}
                    onChange={(e) =>
                      setForm({ ...form, github: e.target.value })
                    }
                  />
                </label>


                <label className="field">
                  <span>Live Demo</span>
                  <input
                    value={form.demo}
                    onChange={(e) => setForm({ ...form, demo: e.target.value })}
                    placeholder="https://your-live-link.com"
                  />
                </label>
              </div>

              <label className="field">
                <span>Image URL</span>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </label>



              <div className="upload">
                <div>
                  <div className="uploadTitle">Upload image (optional)</div>
                  <div className="muted small">
                    If selected, it overrides Image URL.
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <button className="btn primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
              </button>
            </form>
          </section>

          {/* Right: Lists */}
          <section className="panel">
            <div className="tabsHead">
              <div className="tabsTitle">
                <h2>Projects</h2>
                <span className="pill">{viewProjects.length}</span>
              </div>

              <div className="tools">
                <input
                  className="search"
                  placeholder="Search title / tech..."
                  value={projectQuery}
                  onChange={(e) => {
                    setProjectQuery(e.target.value);
                    hideToast();
                  }}
                />

                <select
                  className="select"
                  value={projectSort}
                  onChange={(e) => setProjectSort(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A → Z</option>
                </select>
              </div>
            </div>

            {loadingProjects ? (
              <p className="muted">Loading projects...</p>
            ) : !viewProjects.length ? (
              <div className="empty">
                <b>No projects found</b>
                <div className="muted small">Add a project on the left.</div>
              </div>
            ) : (
              <div className="cardsGrid">
                {viewProjects.map((p) => (
                  <article className="cardMini" key={p._id}>
                    <div className="thumb">
                      {p.image ? (
                        <img src={p.image} alt={p.title} />
                      ) : (
                        <div className="thumbEmpty">No image</div>
                      )}
                    </div>

                    <div className="cardMiniBody">
                      <div className="cardMiniTitle">{p.title}</div>
                      <div className="muted small">{p.tech}</div>
                      {p.demo && (
                        <a className="muted small" href={p.demo} target="_blank" rel="noreferrer">
                          Live Demo ↗
                        </a>
                      )}

                      <div className="cardMiniBtns">
                        <button className="btn ghost" onClick={() => startEdit(p)}>
                          Edit
                        </button>
                        <button
                          className="btn danger"
                          onClick={() => deleteProject(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="divider" />

            <div className="tabsHead">
              <div className="tabsTitle">
                <h2>Messages</h2>
                <span className="pill">{viewMessages.length}</span>
              </div>

              <div className="tools">
                <input
                  className="search"
                  placeholder="Search name / email / text..."
                  value={messageQuery}
                  onChange={(e) => {
                    setMessageQuery(e.target.value);
                    hideToast();
                  }}
                />

                {messages.length > 0 && (
                  <button className="btn danger" onClick={clearMessages}>
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {loadingMessages ? (
              <p className="muted">Loading messages...</p>
            ) : !viewMessages.length ? (
              <div className="empty">
                <b>No messages found</b>
                <div className="muted small">
                  Messages appear when users submit your contact form.
                </div>
              </div>
            ) : (
              <div className="msgList">
                {viewMessages.map((m) => (
                  <article className="msgItem" key={m._id}>
                    <div className="msgHead">
                      <div>
                        <div className="msgName">{m.name}</div>
                        <div className="muted small">{m.email}</div>
                      </div>
                      <div className="muted small">
                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                      </div>
                    </div>

                    <p className="msgText">{m.message}</p>

                    <div className="msgActions">
                      <button
                        className="btn danger"
                        onClick={() => deleteMessage(m._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}