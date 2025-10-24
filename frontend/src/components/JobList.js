import React, { useState } from "react";
import EditJobModal from "./EditJobModal";
import JobDetailsModal from "./JobDetailsModal";

export default function JobList({ jobs, setJobs, token }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJob, setViewJob] = useState(null);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const handleSave = (updatedJob) => {
    setJobs((prev) => prev.map((j) => (j._id === updatedJob._id ? updatedJob : j)));
    setSelectedJob(null);
  };

  return (
    <div>
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.companyName}</td>
              <td>{job.jobTitle}</td>
              <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
              <td className={`status ${job.status.toLowerCase()}`}>{job.status}</td>
              <td>
                <button onClick={() => setViewJob(job)}>View</button>
                <button onClick={() => setSelectedJob(job)}>Edit</button>
                <button onClick={() => deleteJob(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedJob && (
        <EditJobModal job={selectedJob} token={token} onClose={() => setSelectedJob(null)} onSave={handleSave} />
      )}

      {viewJob && <JobDetailsModal job={viewJob} onClose={() => setViewJob(null)} />}
    </div>
  );
}
