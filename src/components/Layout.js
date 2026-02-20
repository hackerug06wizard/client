import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, History, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/investments', icon: TrendingUp, label: 'Investments' },
    { path: '/deposit', icon: Wallet, label: 'Deposit' },
    { path: '/withdraw', icon: Wallet, label: 'Withdraw' },
    { path: '/transactions', icon: History, label: 'History' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-900">StarInvest</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-4 hover:bg-blue-50 transition ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center px-6 py-4 text-red-600 hover:bg-red-50 w-full mt-8"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
