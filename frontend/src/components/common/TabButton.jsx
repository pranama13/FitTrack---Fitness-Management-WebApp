import React from 'react';

const TabButton = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
            isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'
        }`}
    >
        {React.cloneElement(icon, { className: "w-5 h-5 mr-2"})}
        {label}
    </button>
);
export default TabButton;