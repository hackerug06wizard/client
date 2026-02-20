import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api';  // <-- Use this instead of axios
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

  // Use api instead of axios
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

  // ... rest of your JSX code stays the same
};
