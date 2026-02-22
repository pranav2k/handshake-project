import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Index() {
  const [students, setStudents] = useState([]);
  const [editingID, setEditingID] = useState(null);
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

  function handleDelete(id) {
    fetch(`/api/students/${id}`, {method: "DELETE"})
      .then(() => fetch("/api/students"))
      .then((res) => res.json())
      .then(setStudents)
  }

  function handleEdit(id) {
    fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    })
      .then(() => fetch("/api/students"))
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setEditingID(null);
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {editingID === s.id ? (
                <>
                  <td>
                    <input
                      value={form.first_name}
                      onChange = {(e) => setForm({...form, first_name: e.target.value})}
                    />
                  </td>
                  <td>
                  <input
                    value={form.last_name}
                    onChange = {(e) => setForm({...form, last_name: e.target.value})}
                  />
                  </td>
                  <td>
                  <input
                    value={form.check_in_time}
                    onChange = {(e) => setForm({...form, check_in_time: e.target.value})}
                  />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(s.id)}>Save</button>
                    <button onClick={() => setEditingID(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.first_name}</td>
                  <td>{s.last_name}</td>
                  <td>{s.check_in_time}</td>
                  <td>
                    <button onClick={() => {
                      setEditingID(s.id);
                      setForm({
                        first_name: s.first_name,
                        last_name: s.last_name,
                        check_in_time: s.check_in_time,
                      });
                    }}>Edit</button>
                    <button onClick={() => handleDelete(s.id)}>Delete Student</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/new">New User</Link>
    </div>
  );
}

export default Index;
