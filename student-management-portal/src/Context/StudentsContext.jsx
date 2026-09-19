import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StudentsContext = createContext(null);
const STORAGE_KEY = "rollcall-students";

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStudents(JSON.parse(saved));
      setIsLoading(false);
      return;
    }

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setStudents(response.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      })
      .catch(() => setError("Couldn't load the roster."))
      .finally(() => setIsLoading(false));
  }, []);

  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now(), // simple unique id
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newStudent;
  };

  const getStudent = (id) =>
    students.find((s) => String(s.id) === String(id));

  return (
    <StudentsContext.Provider
      value={{ students, isLoading, error, addStudent, getStudent }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentsContext);
}