import Workout from '../models/Workout.js';

// @desc    Get workouts for a specific date
// @route   GET /api/workouts?date=YYYY-MM-DD&status=...&sortBy=...
export const getWorkouts = async (req, res) => {
    try {
        const filter = { user: req.user.id };
        
        const date = new Date(req.query.date);
        const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date(date).setHours(23, 59, 59, 999));
        filter.date = { $gte: startOfDay, $lte: endOfDay };

        if (req.query.status && req.query.status !== 'all') {
            filter.status = req.query.status;
        }

        const sort = {};
        if (req.query.sortBy === 'name') {
            sort.name = 1; // 1 for ascending (A-Z)
        } else {
            // FIX: Default sort is now ascending by creation time (oldest first).
            sort.createdAt = 1; 
        }

        const workouts = await Workout.find(filter).sort(sort);
        
        res.status(200).json({ success: true, data: workouts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Create a new workout
// @route   POST /api/workouts
export const createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create({ ...req.body, user: req.user.id });
        res.status(201).json({ success: true, data: workout });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update a workout (including status and exercises)
// @route   PUT /api/workouts/:id
export const updateWorkout = async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ success: false, message: 'Workout not found' });
        }
        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: workout });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ success: false, message: 'Workout not found' });
        }
        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await workout.deleteOne();
        
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
