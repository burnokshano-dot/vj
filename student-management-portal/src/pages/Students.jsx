import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../Context/StudentsContext";
import "./Students.css";

function StudentRow({ student }) {
  return (
    <Link to={`/students/${student.id}`} className="student-row">
      <span className="student-name">{student.name}</span>
      <span className="student-email muted">{student.email}</span>
      <span className="student-phone muted">{student.phone}</span>
      <span className="student-city muted">{student.address?.city}</span>
    </Link>
  );
}

export default function Students() {
  const { students, isLoading, error } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-page">
      <header className="students-header">
        <div>
          <h1>Students</h1>
          <p className="muted">
            {isLoading
              ? "Loading roster…"
              : `${filteredStudents.length} of ${students.length} students`}
          </p>
        </div>
        <Link to="/students/add" className="btn btn-primary">
          Add a student
        </Link>
      </header>

      <div className="students-search">
        <input
          type="text"
          placeholder="Search by name…"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {error && <p className="students-error">{error}</p>}

      {!isLoading && !error && (
        <div className="students-table">
          <div className="students-table-head">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>City</span>
          </div>

          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))
          ) : (
            <p className="students-empty">No students match "{searchTerm}".</p>
          )}
        </div>
      )}
    </div>
  );
}