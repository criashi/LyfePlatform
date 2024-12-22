import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const PageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-200">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-primary hover:text-primary-dark mb-4 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;