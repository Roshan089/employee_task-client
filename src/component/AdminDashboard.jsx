import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';  
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = () => {
    axios.get('http://localhost:4000/api/v1/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:4000/api/v1/delete/${id}`)
      .then(response => {
        // Filter out the deleted employee from the state
        setEmployees(employees.filter(emp => emp._id !== id));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const createEmployee = () => {
    navigate("/createform")
    
    
  }

   const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token'); 

      navigate('/login');
  };
  

  return (
    <div className="container">
      <div className="header">
        <div className="daslog">
          <h1>Dashboard</h1>
          <button className='button create' onClick={handleLogout}>
            <a href="/login">Logout</a>
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <button className="button create" onClick={createEmployee}>Create Employee</button>

        <h2>Employee List</h2>
        <div className="total-count">Total Count: {employees.length}</div>

        <div className="search-bar">
          <input type="text" placeholder="Enter Search Keyword" />
          <button className="button">Search</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{/* Add employee image here */}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobileNo}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>

                <td>{emp.course.join(', ')}</td>

                <td>{new Date(emp.createDate).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <button className="button edit">Edit</button>
                  <button className="button delete" onClick={() => deleteEmployee(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
