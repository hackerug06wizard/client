import React, { useState } from 'react';
import api from '../api';  // <-- Use this

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', formData);
      // redirect to login
    } catch (error) {
      alert('Registration failed');
    }
  };
};
