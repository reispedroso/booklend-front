import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(3, 'Enter a password'),
});

export type LoginData = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
  username: z.string().min(6, 'Username must have at least 6 characters'),
  firstName: z.string().max(30, 'Maximum characters reached'),
  lastName: z.string().max(30, 'Maximum characters reached'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export type RegisterData = z.infer<typeof registerSchema>;
