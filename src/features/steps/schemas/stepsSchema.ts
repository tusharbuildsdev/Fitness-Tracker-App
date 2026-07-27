import { z } from 'zod';

export const stepsSchema = z.object({
  count: z.coerce
    .number({ message: 'Enter today’s step count.' })
    .int('Steps must be a whole number.')
    .min(0, 'Steps cannot be negative.')
    .max(200_000, 'Step count looks too high.'),
  goal: z.coerce
    .number({ message: 'Enter a daily goal.' })
    .int('Your goal must be a whole number.')
    .min(1_000, 'Set a goal of at least 1,000 steps.')
    .max(200_000, 'Goal looks too high.'),
});

export type StepsFormValues = z.infer<typeof stepsSchema>;
