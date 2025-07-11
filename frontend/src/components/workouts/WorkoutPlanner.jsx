import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../../services/api';
import AddWorkoutForm from './AddWorkoutForm';
import WorkoutList from './WorkoutList';
// Other imports would go here, e.g., FilterSortControls

const WorkoutPlanner = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('date_desc');

    const fetchWorkouts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/workouts');
            setWorkouts(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch workouts.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    const handleAddWorkout = async (workoutData) => {
        try {
            await api.post('/workouts', workoutData);
            fetchWorkouts();
        } catch (err) {
            console.error("Failed to add workout", err);
        }
    };

    const handleDeleteWorkout = async (id) => {
        try {
            await api.delete(`/workouts/${id}`);
            fetchWorkouts();
        } catch (err) {
            console.error("Failed to delete workout", err);
        }
    };

    const handleUpdateWorkout = async (id, data) => {
        try {
            await api.put(`/workouts/${id}`, data);
            fetchWorkouts();
        } catch(err) {
            console.error("Failed to update workout", err);
        }
    };

    const filteredAndSortedWorkouts = useMemo(() => {
        return workouts
            .filter(w => filter === 'all' || w.goal === filter)
            .sort((a, b) => {
                switch (sort) {
                    case 'date_asc': return new Date(a.createdAt) - new Date(b.createdAt);
                    case 'name_asc': return a.name.localeCompare(b.name);
                    case 'name_desc': return b.name.localeCompare(a.name);
                    default: return new Date(b.createdAt) - new Date(a.createdAt);
                }
            });
    }, [workouts, filter, sort]);

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div>
            <AddWorkoutForm onAdd={handleAddWorkout} />
            {/* FilterSortControls would be here */}
            {loading ? (
                <p className="text-center mt-8">Loading workouts...</p>
            ) : (
                <WorkoutList 
                    workouts={filteredAndSortedWorkouts} 
                    onDelete={handleDeleteWorkout}
                    onUpdate={handleUpdateWorkout}
                />
            )}
        </div>
    );
};
export default WorkoutPlanner;