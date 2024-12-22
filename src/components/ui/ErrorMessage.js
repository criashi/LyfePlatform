import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  </div>
);

export default ErrorMessage;