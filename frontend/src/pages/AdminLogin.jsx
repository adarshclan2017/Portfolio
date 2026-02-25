import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import "../styles/Admin.css";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("adarshportfolio@gmail.com");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("admin_token", res.data.token);
      nav("/admin");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="adminPage">
      <div className="adminCard">
        <h2>Admin Login</h2>
        {msg && <div className="toastErr">{msg}</div>}

        <form className="adminForm" onSubmit={login}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btnPrimary" disabled={loading} type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}