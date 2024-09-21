import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(email,password);
      
      const { data } = await axios.post('http://localhost:4000/api/v1/login', { email, password });
      localStorage.setItem('token', data.token); 
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Admin Login</h2>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
