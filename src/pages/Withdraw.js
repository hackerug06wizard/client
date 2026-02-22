import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-hot-toast';

const Withdraw = () => {
  const [formData, setFormData] = useState({ amount: '', phoneNumber: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/payments/withdraw', {
        phoneNumber: formData.phoneNumber,
        amount: parseFloat(formData.amount),
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      toast.success('Withdrawal initiated successfully');
      setSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Withdrawal Initiated!</h2>
        <p className="text-gray-600">Your funds will be sent to your mobile money shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Withdraw Funds</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="number" placeholder="Amount (UGX)" required value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" required value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Last Name" required value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="tel" placeholder="Phone Number (+256...)" required value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
        <button type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50">
          {loading ? 'Processing...' : 'Withdraw Now'}
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
