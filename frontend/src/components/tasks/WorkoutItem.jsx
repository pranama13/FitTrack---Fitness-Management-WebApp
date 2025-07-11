import React, { useState, useEffect } from 'react';
import { Check, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../services/api';
import EditTaskModal from './EditTaskModal';

const WorkoutItem = ({ workout, onRefresh }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // FIX: This effect checks if all sub-exercises are completed and updates the main status.
    useEffect(() => {
        if (!workout.exercises || workout.exercises.length === 0) return;
        
        const allExercisesDone = workout.exercises.every(ex => ex.completed);
        if (allExercisesDone && workout.status !== 'completed') {
            handleToggleStatus(true); // Automatically mark the main task as complete
        } else if (!allExercisesDone && workout.status === 'completed') {
            handleToggleStatus(true, 'pending'); // Automatically mark as pending if an exercise is un-ticked
        }
    }, [workout.exercises, workout.status]);

    const handleToggleStatus = async (isAuto = false, forceStatus = null) => {
        const newStatus = forceStatus || (workout.status === 'completed' ? 'pending' : 'completed');
        
        // When a user manually clicks the main tick, all sub-tasks should match the new state.
        const updatedExercises = isAuto ? workout.exercises : workout.exercises.map(ex => ({ ...ex, completed: newStatus === 'completed' }));
        
        try {
            const payload = { status: newStatus, exercises: updatedExercises };
            await api.put(`/workouts/${workout._id}`, payload);
            onRefresh();
        } catch (error) {
            console.error("Failed to update workout status", error);
        }
    };

    const handleToggleExerciseStatus = async (exerciseIndex) => {
        const updatedExercises = [...workout.exercises];
        updatedExercises[exerciseIndex].completed = !updatedExercises[exerciseIndex].completed;
        
        try {
            await api.put(`/workouts/${workout._id}`, { exercises: updatedExercises });
            onRefresh();
        } catch (error) {
            console.error("Failed to update exercise status", error);
        }
    };
    
    // FIX: This function now directly calls the API without any blocked confirmation dialogs.
    const handleDelete = async () => {
        try {
            await api.delete(`/workouts/${workout._id}`);
            onRefresh();
        } catch (error) {
            console.error("Failed to delete workout", error);
        }
    };

    return (
        <>
            <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${workout.status === 'completed' ? 'bg-slate-800/50 border-green-500 opacity-60' : 'bg-slate-800 border-blue-500'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`font-bold text-lg text-white ${workout.status === 'completed' && 'line-through'}`}>{workout.name}</h3>
                        <p className="text-sm text-gray-400">{workout.bodyPart}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => handleToggleStatus(false)} className={`p-1 rounded-full transition-colors ${workout.status === 'completed' ? 'bg-green-500' : 'bg-gray-600 hover:bg-green-600'}`}><Check className="w-4 h-4 text-white"/></button>
                        <button onClick={() => setShowEditModal(true)} className="text-gray-400 hover:text-yellow-400"><Edit size={18}/></button>
                        <button onClick={handleDelete} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
                        {workout.exercises && workout.exercises.length > 0 && (<button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>)}
                    </div>
                </div>
                {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <ul className="space-y-2 text-sm">
                            {workout.exercises.map((ex, i) => (
                                <li key={ex._id || i} className={`flex justify-between items-start p-2 rounded-md transition-colors ${ex.completed ? 'bg-green-900/50' : 'bg-slate-900/50'}`}>
                                    <div className="flex-1 flex items-start gap-3">
                                        <button onClick={() => handleToggleExerciseStatus(i)} className={`mt-1 p-0.5 rounded-full transition-colors ${ex.completed ? 'bg-green-500' : 'border border-gray-500'}`}>
                                            <Check className={`w-3 h-3 ${ex.completed ? 'text-white' : 'text-transparent'}`}/>
                                        </button>
                                        <div>
                                            <p className={`text-gray-200 font-semibold ${ex.completed && 'line-through text-gray-500'}`}>{ex.name}</p>
                                            {ex.notes && <p className="text-xs text-gray-400 mt-1">{ex.notes}</p>}
                                        </div>
                                    </div>
                                    <span className={`font-mono ml-4 ${ex.completed ? 'text-green-400' : 'text-blue-400'}`}>{ex.sets} x {ex.reps}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {showEditModal && <EditTaskModal task={workout} type="workout" onClose={() => setShowEditModal(false)} onTaskUpdated={onRefresh} />}
        </>
    );
};
export default WorkoutItem;
