import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';
// Exercise-related components would be imported here

const WorkoutItem = ({ workout, onDelete, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    // State for editing, exercises, etc. would go here

    const goalColors = {
        bulking: 'bg-red-500/20 text-red-400 border-red-500/30',
        cutting: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        maintenance: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <div onClick={() => setIsOpen(!isOpen)} className="flex-grow cursor-pointer">
                    <h3 className="text-lg font-semibold text-white">{workout.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${goalColors[workout.goal]}`}>{workout.goal}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-blue-400"><Edit size={18}/></button>
                    <button onClick={onDelete} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                    <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ChevronUp /> : <ChevronDown />}</button>
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">Exercises would be listed here.</p>
                    {/* ExerciseList and AddExerciseForm components would be rendered here */}
                </div>
            )}
        </div>
    );
};
export default WorkoutItem;