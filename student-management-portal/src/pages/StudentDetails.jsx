import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        setStudent(response.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load student.");
      } finally {
        setLoading(false);
      }
    };

    getStudent();
  }, [id]);

  if (loading) {
    return <h2>Loading student...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Student Details</h1>

      <h2>{student.name}</h2>

      <p>
        <strong>ID:</strong> {student.id}
      </p>

      <p>
        <strong>Username:</strong> {student.username}
      </p>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <p>
        <strong>Phone:</strong> {student.phone}
      </p>

      <p>
        <strong>Website:</strong> {student.website}
      </p>

      <h3>Address</h3>

      <p>
        <strong>Street:</strong> {student.address.street}
      </p>

      <p>
        <strong>Suite:</strong> {student.address.suite}
      </p>

      <p>
        <strong>City:</strong> {student.address.city}
      </p>

      <p>
        <strong>Zipcode:</strong> {student.address.zipcode}
      </p>

      <h3>Company</h3>

      <p>
        <strong>Name:</strong> {student.company.name}
      </p>

      <p>
        <strong>Catch Phrase:</strong> {student.company.catchPhrase}
      </p>

      <br />

      <Link to="/students">
        ← Back to Students
      </Link>
    </div>
  );
}

export default StudentDetails;
