import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .min(12, { message: 'Password must be at least 12 characters' }),
});

export const UserValidation = {
  userValidationSchema,
};
