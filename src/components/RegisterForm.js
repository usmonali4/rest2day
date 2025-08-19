import React, { useState } from 'react';
import axios from "../api/axiosConfig"


const RegisterForm = ({ onRegister }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (username.trim() === '' || password.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }
  try {
    const response = await axios.post('/users/login', { username, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('jwtToken', token);
      onRegister(username);
    }
  } catch (error) {
    alert("Register failed");
    setPassword('');
    console.error('Register failed', error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      
      <div>
        <label>Username:</label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
