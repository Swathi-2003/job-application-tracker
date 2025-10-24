import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Dashboard from "./components/Dashboard";
import FilterBar from "./components/FilterBar";
import { CSVLink } from "react-csv";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [authMode, setAuthMode] = useState("register");

  const headers = [
    { label: "Company", key: "companyName" },
    { label: "Title", key: "jobTitle" },
    { label: "Date", key: "applicationDate" },
    { label: "Status", key: "status" },
  ];

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const fetchJobs = () => {
    fetch("http://localhost:5000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(console.error);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setAuthMode("register");
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((j) => j.status === filter);

  if (!token)
    return (
      <div className="auth-container">
        <h1>Job Application Tracker</h1>
        {authMode === "register" ? (
          <Register
            setToken={setToken}
            setAuthMode={setAuthMode}
            setUser={setUser}
          />
        ) : (
          <Login setToken={setToken} setAuthMode={setAuthMode} setUser={setUser} />
        )}
      </div>
    );

  return (
    <div className="container">
      <header>
        <div>
          <h1>Job Application Tracker</h1>
          {user && <p className="welcome">Welcome, {user.name}</p>}
        </div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </header>

      <Dashboard jobs={jobs} />
      <FilterBar setFilter={setFilter} />
      <JobForm setJobs={setJobs} token={token} />
      <JobList jobs={filteredJobs} setJobs={setJobs} token={token} />

      <CSVLink
        data={jobs}
        headers={headers}
        filename="job_applications.csv"
        className="csv-btn"
      >
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default App;
