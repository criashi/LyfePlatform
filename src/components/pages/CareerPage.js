import React from 'react';
import PageLayout from './PageLayout';

const CareerPage = () => {
  return (
    <PageLayout title="Career">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Monitor your career progress, skills development, and professional goals.
        </p>
      </div>
    </PageLayout>
  );
};

export default CareerPage;