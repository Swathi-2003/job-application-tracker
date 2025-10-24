import React, { useState } from "react";

export default function Login({ setToken, setAuthMode, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } else {
      setMsg(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-box">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p>
        New here?{" "}
        <span className="link" onClick={() => setAuthMode("register")}>
          Register now
        </span>
      </p>
    </div>
  );
}
