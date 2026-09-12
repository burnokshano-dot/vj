import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";

/**
 * Search — dedicated search page for the Student Management Portal.
 *
 * Fetches the full roster once, then filters it client-side as the
 * user types. Same data source as Students.jsx, but focused purely
 * on finding a student quickly.
 *
 * Uses: useState, useEffect, axios, map, filter, props.
 */

// Child component — receives a single student via props.
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
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (isMounted) {
          setStudents(response.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Couldn't load students. Try refreshing the page.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
