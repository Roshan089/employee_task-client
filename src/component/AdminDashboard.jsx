import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';  // Assuming you have this CSS in Dashboard.css

const Dashboard = () => {
  const [employees, setEmployees] = useState([
  {
    uniqueId: 1,
    image: "profile1.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    mobileNo: "+1-123-456-7890",
    designation: "Software Engineer",
    gender: "Male",
    course: "Computer Science",
    createDate: "2023-09-10",
    action: {
      edit: "Edit",
      delete: "Delete"
    }
  },
  {
    uniqueId: 2,
    image: "profile2.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobileNo: "+1-987-654-3210",
    designation: "Project Manager",
    gender: "Female",
    course: "Business Management",
    createDate: "2023-08-05",
    action: {
      edit: "Edit",
      delete: "Delete"
    }
  },
  {
    uniqueId: 3,
    image: "profile3.jpg",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    mobileNo: "+1-456-789-1234",
    designation: "Data Analyst",
    gender: "Male",
    course: "Data Science",
    createDate: "2023-07-20",
    action: {
      edit: "Edit",
      delete: "Delete"
    }
  }
  
]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employee')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        setEmployees(employees.filter(emp => emp._id !== id));
      });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="daslog">
          <h1>Dashboard</h1>
          <button className='button create'>
         <a href="/login">Logout</a>
      </button>
        </div>
        
       
      </div>
      

      <div className="dashboard-content">
        <button className="button create">Create Employee</button>

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
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.id}</td>
                <td>{/* Add employee image here */}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobileNo}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.course}</td>
                <td>{emp.createDate}</td>
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
