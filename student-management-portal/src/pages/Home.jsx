import { Link } from "react-router-dom";
import "./Home.css";

/**
 * Home — landing page for the Student Management Portal.
 *
 * Plain CSS (see Home.css) — no Tailwind required.
 * Fonts: add this to your index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
 */

const SAMPLE_ROSTER = [
  { name: "Amara Chen", grade: "10th", status: "Active" },
  { name: "Diego Ferreira", grade: "11th", status: "Active" },
  { name: "Priya Nandakumar", grade: "9th", status: "New" },
];

const FEATURES = [
  {
    title: "Find anyone fast",
    body: "Filter the full roster by name as you type. No page reloads, no waiting on a report to run.",
  },
  {
    title: "A page per student",
    body: "Open any name to see their full profile — contact info, grade, and notes — on its own page.",
  },
  {
    title: "Add in seconds",
    body: "A short form adds a new student to the roster right away — no spreadsheet to keep in sync.",
  },
];

export default function Home() {
  return (
    <div className="home">
      {/* ---------- Nav ---------- */}
      <header className="home-nav">
        <div className="home-nav-inner">
          <span className="home-brand">Rollcall</span>
          <nav className="home-nav-links">
            <Link to="/students">Students</Link>
            <Link to="/search">Search</Link>
            <Link to="/students/add" className="home-nav-cta">
              Add student
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>Every student, one page away.</h1>
          <p>
            Rollcall keeps rosters, contact details, and notes in one place.
            Search a name, open a profile, or add a new student — no
            spreadsheet required.
          </p>
          <div className="home-hero-actions">
            <Link to="/students" className="btn btn-primary">
              Browse the roster
            </Link>
            <Link to="/students/add" className="btn btn-secondary">
              Add a student
            </Link>
          </div>
        </div>

        <div className="home-preview">
          <div className="home-preview-search">Search by name…</div>
          <div className="home-preview-list">
            {SAMPLE_ROSTER.map((student) => (
              <div className="home-preview-row" key={student.name}>
                <span>{student.name}</span>
                <span className="muted">{student.grade}</span>
                <span className={student.status === "New" ? "tag-new" : "muted"}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="home-features">
        {FEATURES.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.body}</p>
          </div>
        ))}
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="home-footer">
        Rollcall — Student Management Portal
      </footer>
    </div>
  );
}