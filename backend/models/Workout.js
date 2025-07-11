import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    notes: { type: String, trim: true },
    completed: { type: Boolean, default: false }
});

const WorkoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    bodyPart: {
        type: String,
        trim: true,
        // FIX: Added 'Shoulders' to the list of allowed values.
        enum: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Legs', 'Cardio', 'Other']
    },
    notes: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, required: true },
    exercises: [ExerciseSchema],
}, { timestamps: true });

const Workout = mongoose.model('Workout', WorkoutSchema);
export default Workout;