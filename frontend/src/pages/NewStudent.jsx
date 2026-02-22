import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function NewStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    check_in_time: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/students", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    }).then(() => navigate("/index"));
  }

  return (
    <div className="container">
      <h2>New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={form.first_name}
          onChange={(e) => setForm({...form, first_name: e.target.value})}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={form.last_name}
          onChange={(e) => setForm({...form, last_name: e.target.value})}
          required
        />
        <label>Check In Time</label>
        <input
          type="datetime-local"
          value={form.check_in_time}
          onChange={(e) => setForm({...form, check_in_time: e.target.value})}
          required
        />
        <button type="submit">Create</button>
      </form>
      <br />
      <Link to="/index">Back</Link>
    </div>
  );
}

export default NewStudent;
