import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import WorkoutItem from './WorkoutItem';
import MealItem from './MealItem';
import AddTaskModal from './AddTaskModal';
import TaskFilterControls from './TaskFilterControls';
import { Plus } from 'lucide-react';

const TaskView = ({ date }) => {
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const [workoutFilter, setWorkoutFilter] = useState('all');
    const [workoutSort, setWorkoutSort] = useState('time');
    const [mealFilter, setMealFilter] = useState('all');
    const [mealSort, setMealSort] = useState('time');

    const fetchWorkouts = useCallback(async () => {
        const dateString = date.toISOString().split('T')[0];
        try {
            const params = new URLSearchParams({ date: dateString, status: workoutFilter, sortBy: workoutSort });
            const res = await api.get(`/workouts?${params.toString()}`);
            setWorkouts(res.data.data);
        } catch (error) {
            console.error("Failed to fetch workouts", error);
        }
    }, [date, workoutFilter, workoutSort]);
    
    const fetchMeals = useCallback(async () => {
        const dateString = date.toISOString().split('T')[0];
        try {
            const params = new URLSearchParams({ date: dateString, status: mealFilter, sortBy: mealSort });
            const res = await api.get(`/meals?${params.toString()}`);
            setMeals(res.data.data);
        } catch (error) {
            console.error("Failed to fetch meals", error);
        }
    }, [date, mealFilter, mealSort]);

    const handleRefresh = () => {
        fetchWorkouts();
        fetchMeals();
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchWorkouts(), fetchMeals()]).finally(() => setLoading(false));
    }, [fetchWorkouts, fetchMeals]);

    return (
        <div>
            <div className="flex justify-end items-center mb-4">
                <button onClick={() => setShowModal(true)} className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    <Plus className="w-5 h-5 mr-2" /> Add Task
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-400 py-10">Loading tasks...</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Workouts Column */}
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-center pb-2 mb-4 border-b-2 border-blue-500 gap-2">
                           <h2 className="text-2xl font-semibold text-white">Workouts</h2>
                           <TaskFilterControls filter={workoutFilter} setFilter={setWorkoutFilter} sort={workoutSort} setSort={setWorkoutSort} />
                        </div>
                        <div className="space-y-4">
                            {workouts.length > 0 ? workouts.map(task => (
                                <WorkoutItem key={task._id} workout={task} onRefresh={handleRefresh} />
                            )) : <p className="text-gray-500 p-4 bg-slate-800/50 rounded-lg">No workouts planned.</p>}
                        </div>
                    </div>
                    {/* Meals Column */}
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-center pb-2 mb-4 border-b-2 border-orange-500 gap-2">
                           <h2 className="text-2xl font-semibold text-white">Meals</h2>
                           <TaskFilterControls filter={mealFilter} setFilter={setMealFilter} sort={mealSort} setSort={setMealSort} />
                        </div>
                        <div className="space-y-4">
                            {meals.length > 0 ? meals.map(task => (
                                <MealItem key={task._id} meal={task} onRefresh={handleRefresh} />
                            )) : <p className="text-gray-500 p-4 bg-slate-800/50 rounded-lg">No meals planned.</p>}
                        </div>
                    </div>
                </div>
            )}
            
            {showModal && <AddTaskModal date={date} onClose={() => setShowModal(false)} onTaskAdded={handleRefresh} />}
        </div>
    );
};
export default TaskView;