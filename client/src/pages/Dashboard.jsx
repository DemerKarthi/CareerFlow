import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <nav className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">CareerFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You have successfully authenticated. This is a protected route.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Your Profile Information</h3>
            <pre className="text-sm text-slate-800 dark:text-slate-200 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
