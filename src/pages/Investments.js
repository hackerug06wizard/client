import React from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Investments = () => {
  const { data: plans, isLoading } = useQuery('plans', () => 
    api.get('/api/investments/plans').then(res => res.data)
  );

  const { data: myInvestments } = useQuery('myInvestments', () => 
    api.get('/api/investments/my-investments').then(res => res.data)
  );

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Investment Plans</h1>
      
      {/* Available Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans?.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Daily ROI:</span>
                <span className="font-semibold text-green-600">{plan.daily_roi}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span className="font-semibold">{plan.duration_days} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min:</span>
                <span className="font-semibold">UGX {plan.min_amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Max:</span>
                <span className="font-semibold">UGX {plan.max_amount?.toLocaleString()}</span>
              </div>
            </div>
            <a 
              href="/deposit" 
              className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Invest Now
            </a>
          </div>
        ))}
      </div>

      {/* My Investments */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Investments</h2>
      {myInvestments?.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">You haven't made any investments yet.</p>
          <a href="/deposit" className="text-blue-600 font-semibold mt-2 inline-block">
            Make your first investment →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {myInvestments?.map((inv) => (
            <div key={inv.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{inv.plan_name}</h3>
                  <p className="text-gray-500 text-sm">Started: {new Date(inv.start_date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">UGX {inv.amount?.toLocaleString()}</p>
                  <p className="text-green-600 font-semibold">{inv.daily_roi}% daily</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  Ends: {new Date(inv.end_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Earned: UGX {inv.total_earned?.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Investments;
