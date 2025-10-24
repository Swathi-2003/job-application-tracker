export default function FilterBar({ setFilter }) {
  return (
    <div className="filter-bar">
      <label>Filter by Status:</label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>
  );
}
