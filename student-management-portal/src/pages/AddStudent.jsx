import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentForm from "../components/StudentForm";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  // Handles changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );

      console.log("New student:", response.data);

      setMessage("Student added successfully!");

      setTimeout(() => {
        navigate("/students");
      }, 1000);
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Failed to add student.");
    }
  };

  return (
    <div>
      <h1>Add Student</h1>

      <StudentForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStudent;
