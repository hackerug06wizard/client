import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" required value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Last Name" required value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <input type="email" placeholder="Email" required value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input type="tel" placeholder="Phone (+256...)" required value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" required value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Confirm Password" required value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 mt-4">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
