import React from 'react';
import PageLayout from './PageLayout';

const PersonalDevelopmentPage = () => {
  return (
    <PageLayout title="Personal Development">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Track your personal growth, learning goals, and self-improvement journey.
        </p>
      </div>
    </PageLayout>
  );
};

export default PersonalDevelopmentPage;