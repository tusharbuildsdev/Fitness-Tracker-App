import { z } from 'zod';

export const waterSchema = z.object({
  amountMl: z.coerce.number({ message: 'Enter your water intake.' }).int('Water intake must be a whole number.').min(0, 'Water intake cannot be negative.').max(30_000, 'Water intake looks too high.'),
  goalMl: z.coerce.number({ message: 'Enter a water goal.' }).int('Goal must be a whole number.').min(250, 'Set a goal of at least 250 ml.').max(30_000, 'Water goal looks too high.'),
});

export type WaterFormValues = z.infer<typeof waterSchema>;
