import React, { useState } from 'react';
import { useLifeMeters } from '../../hooks/useLifeMeters';

const CreateMeterModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const { addCustomMeter } = useLifeMeters();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addCustomMeter(name.trim());
      setName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Custom Meter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="meterName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meter Name
            </label>
            <input
              type="text"
              id="meterName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter meter name"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeterModal;