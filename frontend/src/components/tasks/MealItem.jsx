import React, { useState } from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';
import EditTaskModal from './EditTaskModal';

const MealItem = ({ meal, onRefresh }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleToggleStatus = async () => {
        const newStatus = meal.status === 'completed' ? 'pending' : 'completed';
        try {
            await api.put(`/meals/${meal._id}`, { status: newStatus });
            onRefresh();
        } catch (error) {
            console.error("Failed to update meal status", error);
        }
    };
    
    const handleDelete = async () => {
        try {
            await api.delete(`/meals/${meal._id}`);
            onRefresh();
        } catch (error) {
            console.error("Failed to delete meal", error);
        }
    };

    return (
        <>
            <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${meal.status === 'completed' ? 'bg-slate-800/50 border-green-500 opacity-60' : 'bg-slate-800 border-orange-500'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`font-bold text-lg text-white ${meal.status === 'completed' && 'line-through'}`}>{meal.foodName}</h3>
                        <p className="text-sm text-gray-400">{meal.mealType} - {meal.calories || 'N/A'} kcal</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleToggleStatus} className={`p-1 rounded-full transition-colors ${meal.status === 'completed' ? 'bg-green-500' : 'bg-gray-600 hover:bg-green-600'}`}><Check className="w-4 h-4 text-white"/></button>
                        <button onClick={() => setShowEditModal(true)} className="text-gray-400 hover:text-yellow-400"><Edit size={18}/></button>
                        <button onClick={handleDelete} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
                    </div>
                </div>
            </div>
            
            {showEditModal && <EditTaskModal task={meal} type="meal" onClose={() => setShowEditModal(false)} onTaskUpdated={onRefresh} />}
        </>
    );
};
export default MealItem;
