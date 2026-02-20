import React from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

const Transactions = () => {
  const { data: transactions, isLoading } = useQuery('transactions', () => 
    api.get('/api/transactions').then(res => res.data)
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'deposit' 
      ? <ArrowDownLeft className="w-5 h-5 text-green-500" />
      : <ArrowUpRight className="w-5 h-5 text-red-500" />;
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transaction History</h1>
      
      {transactions?.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">No transactions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions?.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg capitalize">{tx.type}</h3>
                    <p className="text-gray-500 text-sm">{tx.description}</p>
                    <p className="text-gray-400 text-xs">{new Date(tx.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'deposit' ? '+' : '-'} UGX {tx.amount?.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    {getStatusIcon(tx.status)}
                    <span className="text-sm text-gray-500 capitalize">{tx.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
