export default function JobDetailsModal({ job, onClose }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Job Details</h3>
        <p><strong>Company:</strong> {job.companyName}</p>
        <p><strong>Title:</strong> {job.jobTitle}</p>
        <p><strong>Date:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
