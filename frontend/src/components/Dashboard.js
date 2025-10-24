export default function Dashboard({ jobs }) {
  const stats = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  return (
    <div className="dashboard">
      {Object.entries(stats).map(([status, count]) => (
        <div key={status} className="stat-card">
          <h3>{status}</h3>
          <p>{count}</p>
        </div>
      ))}
    </div>
  );
}
