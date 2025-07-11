import express from 'express';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getWorkouts)
    .post(createWorkout);

router.route('/:id')
    .put(updateWorkout)
    .delete(deleteWorkout);

export default router;