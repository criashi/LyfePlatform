import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import ThemeToggle from '../settings/ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'My Goals', path: '/goals' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav className="bg-white dark:bg-dark shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">Lyfe</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;