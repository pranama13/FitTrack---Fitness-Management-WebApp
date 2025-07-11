import React from 'react';
import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workouts, onDelete, onUpdate }) => {
    if (workouts.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No workouts found. Add one to get started!</p>;
    }

    return (
        <div className="space-y-4">
            {workouts.map(workout => (
                <WorkoutItem 
                    key={workout._id} 
                    workout={workout} 
                    onDelete={() => onDelete(workout._id)}
                    onUpdate={(data) => onUpdate(workout._id, data)}
                />
            ))}
        </div>
    );
};
export default WorkoutList;