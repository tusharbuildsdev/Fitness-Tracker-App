import { z } from 'zod';

const optionalUrl = z.string().trim().refine((value) => !value || /^https?:\/\//.test(value), 'Enter a valid https:// image URL.');
const optionalNumber = (minimum: number, maximum: number, message: string) => z.preprocess(
  (value) => value === '' || value === null ? undefined : value,
  z.coerce.number().min(minimum, message).max(maximum, message).optional(),
);

export const profileSchema = z.object({
  displayName: z.string().trim().min(2, 'Enter at least 2 characters.').max(60, 'Name is too long.'),
  avatarUrl: optionalUrl,
  heightCm: optionalNumber(80, 250, 'Enter a height between 80 and 250 cm.'),
  steps: z.coerce.number().int().min(1_000).max(200_000),
  calories: z.coerce.number().int().min(500).max(25_000),
  waterMl: z.coerce.number().int().min(250).max(30_000),
  sleepHours: z.coerce.number().min(1).max(24),
  workoutMinutesWeekly: z.coerce.number().int().min(10).max(10_080),
  targetWeightKg: optionalNumber(20, 500, 'Enter a weight between 20 and 500 kg.'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
