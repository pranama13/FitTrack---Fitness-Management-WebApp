import React, { useState } from 'react';
import { X } from 'lucide-react';

const BMIModal = ({ onClose }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');

    const calculateBmi = () => {
        if (!height || !weight) {
            setBmi(null);
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(bmiValue);

        if (bmiValue < 18.5) {
            setBmiCategory('Underweight');
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            setBmiCategory('Normal weight');
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            setBmiCategory('Overweight');
        } else {
            setBmiCategory('Obesity');
        }
    };

    const getCategoryColor = () => {
        switch (bmiCategory) {
            case 'Underweight': return 'text-blue-400';
            case 'Normal weight': return 'text-green-400';
            case 'Overweight': return 'text-yellow-400';
            case 'Obesity': return 'text-red-400';
            default: return 'text-white';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm border border-slate-700 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X />
                </button>
                <h2 className="text-xl font-bold mb-4 text-white">BMI Calculator</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g., 180"
                            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="e.g., 75"
                            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={calculateBmi} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Calculate
                    </button>
                </div>
                {bmi && (
                    <div className="mt-6 text-center bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-lg text-gray-300">Your BMI is</p>
                        <p className={`text-5xl font-bold my-2 ${getCategoryColor()}`}>{bmi}</p>
                        <p className={`font-semibold ${getCategoryColor()}`}>{bmiCategory}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BMIModal;