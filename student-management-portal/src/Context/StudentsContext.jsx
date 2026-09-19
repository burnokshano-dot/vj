import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StudentsContext = createContext();

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load students when the application starts
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const savedStudents = localStorage.getItem("students");

        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        } else {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );

          setStudents(response.data);
          localStorage.setItem(
            "students",
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Save whenever students change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "students",
        JSON.stringify(students)
      );
    }
  }, [students, loading]);

  // Add a student to the list
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now(),
      address: {
        city: student.city || "—",
      },
    };

    setStudents((currentStudents) => [
      ...currentStudents,
      newStudent,
    ]);
  };

  return (
    <StudentsContext.Provider
      value={{
        students,
        setStudents,
        addStudent,
        loading,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentsContext);
}