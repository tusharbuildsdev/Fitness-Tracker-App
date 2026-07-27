import { z } from 'zod';

const dateTimePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
const toDate = (value: string) => new Date(`${value.replace(' ', 'T')}:00`);

export const sleepSchema = z.object({
  sleepStart: z.string().regex(dateTimePattern, 'Use YYYY-MM-DD HH:mm.'),
  sleepEnd: z.string().regex(dateTimePattern, 'Use YYYY-MM-DD HH:mm.'),
}).superRefine(({ sleepStart, sleepEnd }, context) => {
  const start = toDate(sleepStart);
  const end = toDate(sleepEnd);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    context.addIssue({ code: 'custom', message: 'Enter valid dates and times.', path: ['sleepStart'] });
    return;
  }
  const duration = end.valueOf() - start.valueOf();
  if (duration <= 0) context.addIssue({ code: 'custom', message: 'Sleep end must be after sleep start.', path: ['sleepEnd'] });
  if (duration > 24 * 60 * 60 * 1000) context.addIssue({ code: 'custom', message: 'A sleep session cannot exceed 24 hours.', path: ['sleepEnd'] });
});

export const parseSleepDateTime = toDate;
export type SleepFormValues = z.infer<typeof sleepSchema>;
