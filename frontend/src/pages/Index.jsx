import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Index() {
  const [students, setStudents] = useState([]);

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
      <Link to="/new">New User</Link>
    </div>
  );
}

export default Index;
