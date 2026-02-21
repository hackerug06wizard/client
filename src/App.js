import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Investments from './pages/Investments';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const { logout, user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">StarInvest</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">UGX {user?.balance?.toLocaleString()}</span>
            <button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
            <Route path="/investments" element={<PrivateRoute><Layout><Investments /></Layout></PrivateRoute>} />
            <Route path="/deposit" element={<PrivateRoute><Layout><Deposit /></Layout></PrivateRoute>} />
            <Route path="/withdraw" element={<PrivateRoute><Layout><Withdraw /></Layout></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><Layout><Transactions /></Layout></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
