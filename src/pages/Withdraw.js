import React, { useState } from 'react';
import api from '../api';  // <-- Use this
import { toast } from 'react-hot-toast';
// ... rest of imports

const Withdraw = () => {
  // ... your state

  const handleVerify = async () => {
    // ...
    try {
      const response = await api.post('/api/payments/verify-phone', { 
        phoneNumber: formData.phoneNumber 
      });
      // ...
    } catch (error) {
      // ...
    }
  };

  const handleSubmit = async (e) => {
    // ...
    try {
      const response = await api.post('/api/payments/withdraw', {
        phoneNumber: formData.phoneNumber,
        amount: parseFloat(formData.amount),
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      // ...
    } catch (error) {
      // ...
    }
  };
};
