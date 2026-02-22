import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { toast } from 'react-hot-toast';

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: plans } = useQuery('plans', () => api.get('/api/investments/plans').then(res => res.data));

  const handleDeposit = async () => {
    setLoading(true);
    try {
      await api.post('/api/payments/deposit', {
        phoneNumber,
        amount: parseFloat(amount),
        investmentPlanId: selectedPlan
      });
      toast.success('Please check your phone to authorize payment');
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Deposit Initiated!</h2>
        <p className="text-gray-600">Please check your phone to authorize the payment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Deposit Funds</h1>
      
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select Investment Plan</h2>
          <div className="grid gap-4">
            {plans?.map((plan) => (
              <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition ${selectedPlan === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-blue-600 font-semibold">{plan.daily_roi}% Daily ROI</p>
                <p className="text-sm text-gray-500">UGX {plan.min_amount?.toLocaleString()} - {plan.max_amount?.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <button onClick={() => selectedPlan && setStep(2)} disabled={!selectedPlan}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <input type="number" placeholder="Amount (UGX)" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <input type="tel" placeholder="Phone Number (+256...)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" />
          <button onClick={handleDeposit} disabled={loading || !amount || !phoneNumber}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Deposit;
