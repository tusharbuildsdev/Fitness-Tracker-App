import { z } from 'zod';

import { WORKOUT_TYPES } from '../types';

export const workoutSchema = z.object({
  type: z.enum(WORKOUT_TYPES, { message: 'Choose a workout type.' }),
  durationMinutes: z
    .number({ message: 'Enter the workout duration.' })
    .int('Duration must be a whole number.')
    .min(1, 'Duration must be at least 1 minute.')
    .max(1_440, 'Duration cannot exceed 24 hours.'),
  caloriesBurned: z
    .number({ message: 'Enter calories burned.' })
    .int('Calories must be a whole number.')
    .min(0, 'Calories cannot be negative.')
    .max(20_000, 'Calories look too high.'),
  notes: z.string().trim().max(500, 'Notes must be 500 characters or fewer.'),
  dateKey: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the date format YYYY-MM-DD.'),
});

export type WorkoutFormValues = z.infer<typeof workoutSchema>;
