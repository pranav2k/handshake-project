import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    check_in_time: "",
  });

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), 
    })
      .then(() => fetch("/api/students"))
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setForm({ first_name: "", last_name: "", check_in_time: "" });
        setShowForm(false);
      });
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Check in time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.first_name}</td>
              <td>{s.last_name}</td>
              <td>{s.check_in_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="first_name" placeholder="First name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          <input type="text" name="last_name" placeholder="Last name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          <input type="text" name="check_in_time" placeholder="Check in time" value={form.check_in_time} onChange={(e) => setForm({ ...form, check_in_time: e.target.value })} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>New User</button>
      )}
    </div>
  );
}

export default App;
