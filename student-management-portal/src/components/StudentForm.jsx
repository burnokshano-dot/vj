function StudentForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>

        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>

        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>

        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>

        <input
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
        />
      </div>

      <button type="submit" className="submit-student-btn">
        Add Student
      </button>

    </form>
  );
}

export default StudentForm;