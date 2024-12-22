import React from 'react';
import PageLayout from './PageLayout';

const FinancesPage = () => {
  return (
    <PageLayout title="Finances">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Track your financial health, budgets, and monetary goals.
        </p>
      </div>
    </PageLayout>
  );
};

export default FinancesPage;