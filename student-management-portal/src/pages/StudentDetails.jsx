import { Link, useParams } from "react-router-dom";
import { useStudents } from "../Context/StudentsContext";

function StudentDetails() {
  const { id } = useParams();
  const { getStudent, isLoading } = useStudents();

  if (isLoading) {
    return <h2>Loading student...</h2>;
  }

  const student = getStudent(id);

  if (!student) {
    return (
      <div>
        <h2>Student not found.</h2>
        <Link to="/students">← Back to Students</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Student Details</h1>
      <h2>{student.name}</h2>

      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Username:</strong> {student.username}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Website:</strong> {student.website}</p>

      <h3>Address</h3>
      <p><strong>Street:</strong> {student.address?.street}</p>
      <p><strong>Suite:</strong> {student.address?.suite}</p>
      <p><strong>City:</strong> {student.address?.city}</p>
      <p><strong>Zipcode:</strong> {student.address?.zipcode}</p>

      <h3>Company</h3>
      <p><strong>Name:</strong> {student.company?.name}</p>
      <p><strong>Catch Phrase:</strong> {student.company?.catchPhrase}</p>

      <br />
      <Link to="/students">← Back to Students</Link>
    </div>
  );
}

export default StudentDetails;