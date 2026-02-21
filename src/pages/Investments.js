import React from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { Link } from 'react-router-dom';

const Investments = () => {
  const { data: plans } = useQuery('plans', () => api.get('/api/investments/plans').then(res => res.data));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Investment Plans</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans?.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="text-4xl font-bold text-blue-600 mb-4">{plan.daily_roi}%</div>
            <p className="text-gray-500 text-sm mb-2">Daily ROI</p>
            <p className="text-sm text-gray-500">UGX {plan.min_amount?.toLocaleString()} - {plan.max_amount?.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration_days} Days</p>
            <Link to="/deposit" className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700">
              Invest Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investments;
