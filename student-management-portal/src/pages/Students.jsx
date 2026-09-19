import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentsContext.jsx";
import "./Students.css";

function Students() {
  const { students, setStudents } = useStudents();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (students.length === 0) {
      fetchStudents();
    }
  }, [students.length, setStudents]);

  return (
    <div className="students-page">
      <div className="students-container">

        {/* Header */}
        <div className="students-header">
          <div>
            <h1>Students</h1>
            <p>{students.length} students</p>
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
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    {student.address?.city || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Students;