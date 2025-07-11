import React, { useState } from 'react';
import api from '../../services/api';
import { X, PlusCircle } from 'lucide-react';

const EditTaskModal = ({ task, type, onClose, onTaskUpdated }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(task);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleExerciseChange = (index, event) => {
        const values = [...formData.exercises];
        values[index][event.target.name] = event.target.value;
        setFormData({ ...formData, exercises: values });
    };
    const handleAddExerciseField = () => {
        if (formData.exercises.length < 10) setFormData({ ...formData, exercises: [...formData.exercises, { name: '', sets: '', reps: '', notes: '' }] });
    };
    const handleRemoveExerciseField = (index) => {
        if (formData.exercises.length > 1) {
            const values = [...formData.exercises];
            values.splice(index, 1);
            setFormData({ ...formData, exercises: values });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (type === 'workout') {
                await api.put(`/workouts/${task._id}`, formData);
            } else {
                await api.put(`/meals/${task._id}`, formData);
            }
            onTaskUpdated();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task.');
        }
    };

    const renderWorkoutForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Workout Title" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select name="bodyPart" value={formData.bodyPart} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Chest</option>
                    <option>Back</option>
                    <option>Shoulders</option>
                    <option>Biceps</option>
                    <option>Triceps</option>
                    <option>Abs</option>
                    <option>Legs</option>
                    <option>Cardio</option>
                    <option>Other</option>
                </select>
            </div>
            <h3 className="text-lg font-semibold border-b border-slate-600 pb-2">Exercises</h3>
            {formData.exercises.map((exercise, index) => (
                <div key={index} className="p-3 bg-slate-900/50 rounded-lg space-y-3 relative">
                     {formData.exercises.length > 1 && (<button type="button" onClick={() => handleRemoveExerciseField(index)} className="absolute -top-2 -right-2 text-red-500 bg-slate-700 rounded-full p-0.5 hover:bg-red-400 hover:text-white transition-colors"><X size={16}/></button>)}
                    <input type="text" name="name" value={exercise.name} onChange={e => handleExerciseChange(index, e)} placeholder={`Exercise ${index + 1} Name`} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="flex items-center gap-3">
                         <input type="number" name="sets" value={exercise.sets} onChange={e => handleExerciseChange(index, e)} placeholder="Sets" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                         <span className="text-gray-400">x</span>
                         <input type="text" name="reps" value={exercise.reps} onChange={e => handleExerciseChange(index, e)} placeholder="Reps" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <textarea name="notes" value={exercise.notes} onChange={e => handleExerciseChange(index, e)} placeholder="Additional notes" rows="2" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
            ))}
             {formData.exercises.length < 10 && (<button type="button" onClick={handleAddExerciseField} className="w-full flex justify-center items-center gap-2 p-2 text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"><PlusCircle size={16} /> Add Another Exercise</button>)}
        </div>
    );

    const renderMealForm = () => (
        <div className="space-y-4">
            <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Food Name" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <div className="flex gap-4">
                <select name="mealType" value={formData.mealType} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                </select>
                <input type="number" name="calories" value={formData.calories} onChange={handleChange} placeholder="Calories" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-lg border border-slate-700 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X/></button>
                <h2 className="text-xl font-bold mb-4">Edit {type === 'workout' ? 'Workout' : 'Meal'}</h2>
                <form onSubmit={handleSubmit}>
                    {type === 'workout' ? renderWorkoutForm() : renderMealForm()}
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700">Update Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditTaskModal;