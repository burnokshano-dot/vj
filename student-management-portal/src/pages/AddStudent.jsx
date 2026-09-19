import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentForm from "../components/StudentForm";
import { useStudents } from "../context/StudentsContext";
import "./AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    city: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send data to JSONPlaceholder
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
        }
      );

      console.log("API response:", response.data);

      // Add the student to our actual application state
      addStudent(formData);

      setMessage("Student added successfully!");

      // Go back to students page
      setTimeout(() => {
        navigate("/students");
      }, 800);

    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Failed to add student.");
    }
  };

  return (
    <div className="add-student-page">
      <div className="add-student-container">

        <div className="add-student-header">
          <h1>Add Student</h1>
          <p>Create a new student record</p>
        </div>

        {message && (
          <div
            className={`student-message ${
              message.includes("successfully")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="student-form-card">

          <div className="form-card-title">
            <div className="form-icon">
              +
            </div>

            <div>
              <h2>Student Information</h2>
              <p>
                Enter the student's details below
              </p>
            </div>
          </div>

          <StudentForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

        </div>

      </div>
    </div>
  );
}

export default AddStudent;