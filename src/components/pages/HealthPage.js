import React from 'react';
import PageLayout from './PageLayout';

const HealthPage = () => {
  return (
    <PageLayout title="Health">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Track and manage your health metrics, habits, and goals.
        </p>
      </div>
    </PageLayout>
  );
};

export default HealthPage;