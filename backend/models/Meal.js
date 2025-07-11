import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    mealType: { type: String, required: true, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
    foodName: { type: String, required: true, trim: true },
    calories: { type: Number },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, required: true }, // Date for the meal
    ingredients: [{
        name: { type: String, trim: true },
        quantity: { type: String, trim: true }
    }],
}, { timestamps: true });

const Meal = mongoose.model('Meal', MealSchema);
export default Meal;