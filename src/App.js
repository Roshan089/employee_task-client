import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import Dashboard from './component/AdminDashboard';
import Signup from './component/signup';
import './App.css';
import CreateForm from './component/CreateForm';
import UpdateForm from './component/updateForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createform" element={<CreateForm />} />
        <Route path="/updateform/:id" element={<UpdateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
