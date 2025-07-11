import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddWorkoutForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('maintenance');
    const goals = [ { value: 'bulking', label: 'Bulking' }, { value: 'cutting', label: 'Cutting' }, { value: 'maintenance', label: 'Maintenance' }];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd({ name, goal });
        setName('');
        setGoal('maintenance');
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Add New Workout</h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Push Day" className="flex-grow p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"/>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full sm:w-auto">
                    {goals.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
                <button type="submit" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
                    <Plus className="w-5 h-5 mr-2" /> Add Workout
                </button>
            </form>
        </div>
    );
};
export default AddWorkoutForm;