import { useEffect } from "react";
import axios from "axios";
import { useStudents } from "../context/StudentsContext.jsx";

function Students() {
  const { students, setStudents } = useStudents();

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

    // Only fetch the initial students
    if (students.length === 0) {
      fetchStudents();
    }
  }, [students.length, setStudents]);

  return (
    <div>
      {/* your existing Students UI */}

      {students.map((student) => (
        <div key={student.id}>
          {student.name}
        </div>
      ))}
    </div>
  );
}

export default Students;