import React, { useState } from "react";

export default function EditJobModal({ job, token, onClose, onSave }) {
  const [form, setForm] = useState({
    companyName: job.companyName,
    jobTitle: job.jobTitle,
    applicationDate: job.applicationDate.split("T")[0],
    status: job.status,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) onSave(data);
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Edit Job</h3>
        <form onSubmit={handleSubmit}>
          <input name="companyName" value={form.companyName} onChange={handleChange} required />
          <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required />
          <input type="date" name="applicationDate" value={form.applicationDate} onChange={handleChange} required />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
