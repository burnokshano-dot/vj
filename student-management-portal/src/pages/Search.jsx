import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../Context/StudentsContext";
import "./Search.css";

function SearchResult({ student }) {
  return (
    <Link to={`/students/${student.id}`} className="result-card">
      <div className="result-name">{student.name}</div>
      <div className="result-meta muted">
        {student.email} · {student.phone}
      </div>
    </Link>
  );
}

export default function Search() {
  const { students, isLoading, error } = useStudents();
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();

  const results = trimmedQuery
    ? students.filter((student) =>
        student.name.toLowerCase().includes(trimmedQuery)
      )
    : [];

  return (
    <div className="search-page">
      <div className="search-intro">
        <h1>Search students</h1>
        <p className="muted">Start typing a name to find a student.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          autoFocus
          placeholder="Search by name…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {isLoading && <p className="search-status muted">Loading roster…</p>}
      {error && <p className="search-status error">{error}</p>}

      {!isLoading && !error && (
        <div className="search-results">
          {trimmedQuery === "" ? (
            <p className="search-status muted">
              Type a name above to see matching students.
            </p>
          ) : results.length > 0 ? (
            results.map((student) => (
              <SearchResult key={student.id} student={student} />
            ))
          ) : (
            <p className="search-status muted">
              No students match "{query}".
            </p>
          )}
        </div>
      )}
    </div>
  );
}