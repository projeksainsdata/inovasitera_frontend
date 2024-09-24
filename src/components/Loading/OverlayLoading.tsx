/* eslint-disable tailwindcss/migration-from-tailwind-2 */
// OverlaySpinner.tsx
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface OverlaySpinnerProps {
  show: boolean;
}

const OverlaySpinner: React.FC<OverlaySpinnerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-75">
      <LoadingSpinner />
    </div>
  );
};

export default OverlaySpinner;
