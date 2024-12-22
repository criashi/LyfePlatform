import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import ActionButtons from './ActionButtons';
import LifeMeterCard from './LifeMeterCard';
import AddCustomMeterButton from '../meters/AddCustomMeterButton';
import CreateMeterModal from '../meters/CreateMeterModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { useLifeMeters } from '../../hooks/useLifeMeters';

const Dashboard = () => {
  const { meters, updateMeter, loading, error } = useLifeMeters();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-200">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Track and manage your life balance</p>
        </div>
        
        <ActionButtons />

        <div className="space-y-4">
          {meters.map((meter) => (
            <LifeMeterCard
              key={meter.id}
              meter={meter}
              onUpdateMeter={updateMeter}
            />
          ))}
          <AddCustomMeterButton onClick={() => setIsModalOpen(true)} />
        </div>
      </main>
      <CreateMeterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;