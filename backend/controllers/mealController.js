import Meal from '../models/Meal.js';

// @desc    Get meals for a specific date
// @route   GET /api/meals?date=YYYY-MM-DD&status=...&sortBy=...
export const getMeals = async (req, res) => {
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
            sort.foodName = 1; // Sort by foodName A-Z
        } else {
            // FIX: Default sort is now ascending by creation time (oldest first).
            sort.createdAt = 1;
        }

        const meals = await Meal.find(filter).sort(sort);

        res.status(200).json({ success: true, data: meals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Create a new meal
// @route   POST /api/meals
export const createMeal = async (req, res) => {
    try {
        const meal = await Meal.create({ ...req.body, user: req.user.id });
        res.status(201).json({ success: true, data: meal });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update a meal
// @route   PUT /api/meals/:id
export const updateMeal = async (req, res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        if (meal.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: meal });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
export const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        if (meal.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        
        await meal.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};