import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  // Basic password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length < 8) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      console.log(name, email, password);
      // Send the user data to the server
      await axios.post('http://localhost:4000/api/v1/signup', { name, email, password });
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Admin Sign Up</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordStrength(e.target.value); // Check password strength
          }}
          placeholder="Password"
          required
        />
        <p>Password strength: {passwordStrength}</p>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
