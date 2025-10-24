import React, { useState } from "react";

export default function Register({ setToken, setAuthMode, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setMsg("Registration successful! Please log in now.");
      setAuthMode("login");
    } else if (data.message?.includes("exists")) {
      setMsg("User already registered. Please log in.");
      setAuthMode("login");
    } else {
      setMsg(data.message || data.error);
    }
  };

  return (
    <div className="auth-box">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => setAuthMode("login")}>
          Login here
        </span>
      </p>
    </div>
  );
}
