import React, { useState } from "react";

export default function JobForm({ setJobs, token }) {
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    applicationDate: "",
    status: "Applied",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (form.companyName.trim().length < 3) {
      return setError("Company name must be at least 3 characters.");
    }
    if (new Date(form.applicationDate) > new Date()) {
      return setError("Application date cannot be in the future.");
    }

    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.message || "Error adding job");

    setJobs((prev) => [...prev, data]);
    setForm({
      companyName: "",
      jobTitle: "",
      applicationDate: "",
      status: "Applied",
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      {error && <p className="error">{error}</p>}
      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        required
      />
      <input
        name="jobTitle"
        placeholder="Job Title"
        value={form.jobTitle}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="applicationDate"
        value={form.applicationDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}
