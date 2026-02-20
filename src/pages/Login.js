import React, { useState } from 'react';
import api from '../api';  // <-- Use this
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { email, password });
      login(response.data.token, response.data.user);
    } catch (error) {
      alert('Login failed');
    }
  };

  // ... JSX
};
