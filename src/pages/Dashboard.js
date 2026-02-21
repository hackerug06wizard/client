import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, PiggyBank } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Balance" value={`UGX ${user?.balance?.toLocaleString() || '0'}`} icon={Wallet} color="bg-blue-500" />
        <StatCard title="Total Invested" value={`UGX ${user?.total_invested?.toLocaleString() || '0'}`} icon={PiggyBank} color="bg-green-500" />
        <StatCard title="Total Earned" value={`UGX ${user?.total_earned?.toLocaleString() || '0'}`} icon={TrendingUp} color="bg-yellow-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/deposit" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-xl transition">
          <h3 className="text-xl font-semibold">Deposit Funds</h3>
          <p className="text-blue-100">Add money via MTN or Airtel Money</p>
        </Link>
        <Link to="/withdraw" className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white hover:shadow-xl transition">
          <h3 className="text-xl font-semibold">Withdraw</h3>
          <p className="text-green-100">Withdraw to your mobile money</p>
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-xl`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default Dashboard;
