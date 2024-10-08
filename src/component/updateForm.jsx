import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: {
      MCA: false,
      BCA: false,
      BSC: false,
    }
  });

  // Fetch the data based on the id (if needed)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/employee/${id}`);
        const employee = response.data;
        setFormData({
          name: employee.name,
          email: employee.email,
          mobileNo: employee.mobileNo,
          designation: employee.designation,
          gender: employee.gender,
          courses: {
            MCA: employee.courses.includes('MCA'),
            BCA: employee.courses.includes('BCA'),
            BSC: employee.courses.includes('BSC'),
          }
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        courses: { ...formData.courses, [name]: checked }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: formData.name,
      email: formData.email,
      mobileNo: formData.mobileNo,
      designation: formData.designation,
      gender: formData.gender,
      courses: Object.keys(formData.courses).filter(course => formData.courses[course]),
      };
      console.log("bolo beeee",employeeData);
      

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/update/${id}`, employeeData);
      console.log("Employee Updated:", response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating employee:", error.response.data);
      alert(`Validation Error: ${error.response.data.error}`);
    }
  };
 return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Udate Form</h2>

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

     
      <div className="form-group">
        <label htmlFor="mobileNo">mobileNo Number</label>
        <input
          type="tel"
          id="mobileNo"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
        />
      </div>

      
      <div className="form-group">
        <label htmlFor="designation">Designation</label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

    
      <div className="form-group">
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === 'M'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === 'F'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>

   
      <div className="form-group">
        <label>Course</label>
        <label>
          <input
            type="checkbox"
            name="MCA"
            checked={formData.courses.MCA}
            onChange={handleChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BCA"
            checked={formData.courses.BCA}
            onChange={handleChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BSC"
            checked={formData.courses.BSC}
            onChange={handleChange}
          />
          BSC
        </label>
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default UpdateForm;