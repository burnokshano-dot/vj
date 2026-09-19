import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentsContext";
import "./Students.css";

function Students() {
  const { students, loading } = useStudents();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="students-page">
        <div className="students-container">
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="students-page">
      <div className="students-container">

        {/* Header */}

        <div className="students-header">

          <div>
            <h1>Students</h1>

            <p>
              {students.length} of {students.length} students
            </p>
          </div>

          <button
            className="add-student-btn"
            onClick={() => navigate("/students/add")}
          >
            Add a student
          </button>

        </div>

        {/* Search */}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        {/* Table */}

        <div className="students-table-container">

          <table className="students-table">

            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>CITY</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>

                    <td className="student-name">
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.phone}
                    </td>

                    <td>
                      {student.address?.city || "—"}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="no-students"
                  >
                    No students found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Students;