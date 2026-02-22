import React from 'react';
import { useQuery } from 'react-query';
import api from '../api';

const Transactions = () => {
  const { data: transactions } = useQuery('transactions', () => api.get('/api/transactions').then(res => res.data));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transaction History</h1>
      
      {transactions?.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No transactions yet.</p>
      ) : (
        <div className="space-y-4">
          {transactions?.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg capitalize">{tx.type}</h3>
                <p className="text-gray-500 text-sm">{tx.description}</p>
                <p className="text-gray-400 text-xs">{new Date(tx.created_at).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'deposit' ? '+' : '-'} UGX {tx.amount?.toLocaleString()}
                </p>
                <span className="text-sm text-gray-500 capitalize">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
