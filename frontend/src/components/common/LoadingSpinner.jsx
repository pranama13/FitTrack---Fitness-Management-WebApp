import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-slate-900/50 backdrop-blur-sm">
      <Dumbbell 
        className="w-16 h-16 text-blue-500 animate-spin" 
        style={{ animationDuration: '1.5s' }} 
      />
      <p className="mt-4 text-lg text-gray-300 tracking-widest">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
