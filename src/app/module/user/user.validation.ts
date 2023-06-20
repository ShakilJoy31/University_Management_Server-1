import { z } from 'zod'

// Zod Validation
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})
export const UserValidation = {
    createUserZodSchema,
}