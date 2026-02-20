import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { toast } from 'react-hot-toast';
import { CheckCircle, Loader2 } from 'lucide-react';

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: plans } = useQuery('plans', () => 
    api.get('/api/investments/plans').then(res => res.data)
  );

  const handleVerifyPhone = async () => {
    if (!phoneNumber.match(/^\+256[0-9]{9}$/)) {
      toast.error('Please enter a valid Ugandan phone number (+256...)');
      return;
    }
    
    setIsVerifying(true);
    try {
      const response = await api.post('/api/payments/verify-phone', { phoneNumber });
      setVerifiedName(response.data.name || 'Verified User');
      toast.success('Phone number verified!');
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeposit = async () => {
    if (!selectedPlan || !amount || !phoneNumber) {
      toast.error('Please fill all fields');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await api.post('/api/payments/deposit', {
        phoneNumber,
        amount: parseFloat(amount),
        investmentPlanId: selectedPlan
      });
      
      toast.success(response.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Deposit failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Deposit Funds</h1>

      <div className="flex mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex-1 h-2 rounded-full mx-1 ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select Investment Plan</h2>
          <div className="grid gap-4">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition ${
                  selectedPlan === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    <p className="text-blue-600 font-semibold mt-2">{plan.daily_roi}% Daily ROI</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">UGX {plan.min_amount?.toLocaleString()} - {plan.max_amount?.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{plan.duration_days} Days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => selectedPlan && setStep(2)}
            disabled={!selectedPlan}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (UGX)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="+2567XXXXXXXX"
              />
              <button
                onClick={handleVerifyPhone}
                disabled={isVerifying}
                className="bg-gray-100 text-gray-700 px-6 rounded-xl font-medium hover:bg-gray-200"
              >
                {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
              </button>
            </div>
            {verifiedName && (
              <div className="mt-2 flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Verified: {verifiedName}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleDeposit}
            disabled={isProcessing || !verifiedName}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
          >
            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Deposit'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Deposit Initiated!</h2>
          <p className="text-gray-600 mb-8">
            Please check your phone and authorize the payment request from MarzPay.
          </p>
          <a href="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">
            Go to Dashboard
          </a>
        </div>
      )}
    </div>
  );
};

export default Deposit;
