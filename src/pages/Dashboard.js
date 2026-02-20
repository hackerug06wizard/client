import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, TrendingUp, PiggyBank, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Balance', value: `UGX ${user?.balance?.toLocaleString() || '0'}`, icon: Wallet, color: 'bg-blue-500' },
    { title: 'Total Invested', value: `UGX ${user?.total_invested?.toLocaleString() || '0'}`, icon: PiggyBank, color: 'bg-green-500' },
    { title: 'Total Earned', value: `UGX ${user?.total_earned?.toLocaleString() || '0'}`, icon: TrendingUp, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link to="/deposit" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Deposit Funds</h3>
              <p className="text-blue-100">Add money via MTN or Airtel Money</p>
            </div>
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </Link>
        
        <Link to="/withdraw" className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Withdraw</h3>
              <p className="text-green-100">Withdraw to your mobile money</p>
            </div>
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-center py-8">No recent transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
