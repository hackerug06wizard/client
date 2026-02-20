import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Loader2, CheckCircle } from 'lucide-react';

const Withdraw = () => {
  const [formData, setFormData] = useState({
    amount: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    if (!formData.phoneNumber.match(/^\+256[0-9]{9}$/)) {
      toast.error('Please enter a valid Ugandan phone number');
      return;
    }
    
    setIsVerifying(true);
    try {
      const response = await api.post('/api/payments/verify-phone', { 
        phoneNumber: formData.phoneNumber 
      });
      setVerifiedName(response.data.name);
      toast.success('Phone verified successfully');
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsProcessing(true);
    try {
      const response = await api.post('/api/payments/withdraw', {
        phoneNumber: formData.phoneNumber,
        amount: parseFloat(formData.amount),
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      toast.success(response.data.message);
      setSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Withdrawal failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 text-center py-12">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Withdrawal Initiated!</h2>
        <p className="text-gray-600 mb-8">
          Your funds will be sent to your mobile money shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Withdraw Funds</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (UGX)</label>
          <input
            type="number"
            required
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex gap-2">
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="flex-1 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="+2567XXXXXXXX"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying}
              className="bg-gray-100 text-gray-700 px-6 rounded-xl font-medium hover:bg-gray-200"
            >
              {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
            </button>
          </div>
          {verifiedName && (
            <p className="mt-2 text-green-600 text-sm">✓ Verified: {verifiedName}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isProcessing || !verifiedName}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 flex justify-center items-center"
        >
          {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Withdraw Now'}
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
