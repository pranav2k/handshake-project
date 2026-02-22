import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    check_in_time: ""
  })

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/api/students", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
      .then(() => fetch("/api/students"))
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setForm({first_name: "", last_name: "", check_in_time: ""});
        setShowForm(false)
      });
  }

  function handleDelete(id) {
    fetch(`/api/students/${id}`, {method: "DELETE"})
      .then(() => fetch("/api/students"))
      .then((res) => res.json())
      .then(setStudents)
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Check in time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.first_name}</td>
              <td>{s.last_name}</td>
              <td>{s.check_in_time}</td>
              <td><button onClick={() => handleDelete(s.id)}>Delete Student</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm ? (
        <form onSubmit = {handleSubmit}>
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
      ):(
        <a href="#" onClick={() => setShowForm(true)}>New User</a>
      )}
    </div>
  );
}

export default App;
