import express from 'express';
import { getMeals, createMeal, updateMeal, deleteMeal } from '../controllers/mealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getMeals)
    .post(createMeal);

router.route('/:id')
    .put(updateMeal)
    .delete(deleteMeal);

export default router;
