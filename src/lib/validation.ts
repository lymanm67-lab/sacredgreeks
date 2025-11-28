import { z } from 'zod';

export const communityServiceSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  hours: z.number()
    .min(0, 'Hours must be positive')
    .max(1000, 'Hours must be less than 1000')
});

export const chapterMeetingSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  meeting_date: z.string()
    .min(1, 'Date is required'),
  attendees: z.string()
    .max(500, 'Attendees must be less than 500 characters')
    .optional(),
  notes: z.string()
    .max(5000, 'Notes must be less than 5000 characters')
    .optional(),
  action_items: z.string()
    .max(2000, 'Action items must be less than 2000 characters')
    .optional()
});

export const prayerJournalSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  content: z.string()
    .trim()
    .min(1, 'Prayer content is required')
    .max(5000, 'Prayer must be less than 5000 characters'),
  prayer_type: z.enum(['request', 'thanksgiving', 'confession', 'praise'], {
    errorMap: () => ({ message: 'Please select a valid prayer type' })
  })
});

export const assessmentStep2Schema = z.object({
  role: z.string()
    .trim()
    .min(1, 'Role is required')
    .max(100, 'Role must be less than 100 characters'),
  situation: z.string()
    .trim()
    .min(1, 'Situation description is required')
    .max(2000, 'Situation must be less than 2000 characters'),
  whoInvolved: z.string().max(500).optional(),
  alreadyDone: z.string().max(1000).optional(),
  emotions: z.array(z.string()).min(1, 'Please select at least one emotion'),
  desiredOutcome: z.string()
    .trim()
    .min(1, 'Please share your desired outcome')
    .max(1000, 'Outcome must be less than 1000 characters'),
  supportLevel: z.string()
    .min(1, 'Please select your support level'),
  scenarioSpecific: z.record(z.string(), z.string().max(1000, 'Field must be less than 1000 characters'))
});
