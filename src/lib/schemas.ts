import * as z from 'zod';

export const appFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  state: z.string().min(1, 'State is required'),

});

export type AppFormSchema = z.infer<typeof appFormSchema>;
