import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Dashboard() {
  const [employees, setEmployees] = useState([{id:"1",name:"rika"}]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await axios.get('/employee');
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="dashboard">
      <h2>Employee Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
