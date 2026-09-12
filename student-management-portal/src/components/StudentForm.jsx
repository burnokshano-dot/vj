function StudentForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Student Information</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter student name"
          required
        />
      </div>

      <br />

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Enter username"
          required
        />
      </div>

      <br />

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter email"
          required
        />
      </div>

      <br />

      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Enter phone number"
        />
      </div>

      <br />

      <button type="submit">
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;