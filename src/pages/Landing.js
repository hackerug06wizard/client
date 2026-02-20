import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Clock, Wallet } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">StarInvest</div>
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          <Link to="/register" className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Grow Your Wealth with <span className="text-yellow-400">Smart Investments</span>
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join thousands of investors earning daily returns through our secure investment platform. 
          Powered by MarzPay for instant mobile money transactions.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition">
            Start Investing Now
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8 text-yellow-400" />}
            title="Daily Returns"
            description="Earn up to 4% daily ROI on your investments"
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-yellow-400" />}
            title="Secure Platform"
            description="Bank-grade security for your investments"
          />
          <FeatureCard 
            icon={<Clock className="w-8 h-8 text-yellow-400" />}
            title="Instant Withdrawals"
            description="Get paid instantly to your mobile money"
          />
          <FeatureCard 
            icon={<Wallet className="w-8 h-8 text-yellow-400" />}
            title="Easy Deposits"
            description="Deposit via MTN or Airtel Money seamlessly"
          />
        </div>
      </div>

      {/* Investment Plans Preview */}
      <div className="container mx-auto px-6 py-20 bg-white/5 rounded-3xl my-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Investment Plans</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <PlanCard name="Starter" min="10,000" max="100,000" roi="2.5%" days="30" />
          <PlanCard name="Basic" min="100,000" max="500,000" roi="3.0%" days="60" />
          <PlanCard name="Premium" min="500,000" max="2M" roi="3.5%" days="90" />
          <PlanCard name="VIP" min="2M" max="10M" roi="4.0%" days="120" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </div>
);

const PlanCard = ({ name, min, max, roi, days }) => (
  <div className="bg-white rounded-2xl p-6 text-center hover:scale-105 transition transform">
    <h3 className="text-2xl font-bold text-blue-900 mb-2">{name}</h3>
    <div className="text-4xl font-bold text-yellow-500 mb-4">{roi}</div>
    <p className="text-gray-600 mb-2">Daily ROI</p>
    <div className="border-t pt-4 mt-4">
      <p className="text-sm text-gray-500">UGX {min} - UGX {max}</p>
      <p className="text-sm text-gray-500">{days} Days Duration</p>
    </div>
  </div>
);

export default Landing;
