import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    // This is now a fixed overlay that covers the entire screen.
    // - `bg-slate-900/50`: Creates a semi-transparent dark background.
    // - `backdrop-blur-sm`: Applies a blur effect to whatever is behind this element.
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
