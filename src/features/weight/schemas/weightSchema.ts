import { z } from 'zod';

export const weightSchema = z.object({
  weightKg: z.coerce.number({ message: 'Enter your weight.' }).min(20, 'Weight must be at least 20 kg.').max(500, 'Weight looks too high.'),
  dateKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the date format YYYY-MM-DD.'),
});

export type WeightFormValues = z.infer<typeof weightSchema>;
