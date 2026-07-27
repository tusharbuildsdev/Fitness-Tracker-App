import { z } from 'zod';

export const caloriesSchema = z.object({
  consumed: z.coerce
    .number({ message: 'Enter today’s calories.' })
    .int('Calories must be a whole number.')
    .min(0, 'Calories cannot be negative.')
    .max(25_000, 'Calorie total looks too high.'),
  goal: z.coerce
    .number({ message: 'Enter your calorie goal.' })
    .int('Your goal must be a whole number.')
    .min(500, 'Set a goal of at least 500 calories.')
    .max(25_000, 'Calorie goal looks too high.'),
});

export type CaloriesFormValues = z.infer<typeof caloriesSchema>;
