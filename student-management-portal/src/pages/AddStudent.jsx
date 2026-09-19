import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { useStudents } from "../Context/StudentsContext";

function AddStudent() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addStudent(formData);
    setMessage("Student added successfully!");
    setTimeout(() => navigate("/students"), 800);
  };

  return (
    <div>
      <h1>Add Student</h1>
      <StudentForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStudent;