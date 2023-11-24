import { z } from 'zod';

export const studentValidationZod = z.object({
  id: z.string().optional(),
  password: z.string(),
  name: z
    .object({
      firstName: z
        .string()
        .min(1)
        .trim()
        .refine(value => value.length > 0, {
          message: 'First name is required',
        }),
      middleName: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: 'Middle name is required',
        }),
      lastName: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: 'Last name is required',
        }),
    })
    .refine(
      value =>
        value.firstName !== '' &&
        value.middleName !== '' &&
        value.lastName !== '',
      {
        message: 'Name is required',
      },
    ),

  gender: z.enum(['male', 'female']).refine(value => value !== undefined, {
    message: 'Gender is required',
  }),

  email: z.string().email({ message: 'Invalid email address' }),
  contactNumber: z
    .string()
    .min(1)
    .refine(value => value.length > 0, {
      message: 'Contact number is required',
    }),

  emergencyContactNumber: z
    .string()
    .min(1)
    .refine(value => value.length > 0, {
      message: 'Emergency contact number is required',
    }),

  dateOfBirth: z.string(),
  bloodGroup: z.string(),
  presentAddress: z
    .string()
    .min(1)
    .refine(value => value.length > 0, {
      message: 'Present address is required',
    }),
  permanentAddress: z
    .string()
    .min(1)
    .refine(value => value.length > 0, {
      message: 'Permanent address is required',
    }),

  guardian: z
    .object({
      fatherName: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Father's name is required",
        }),
      fatherOccupation: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Father's occupation is required",
        }),
      fatherContactNumber: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Father's contact number is required",
        }),
      motherName: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Mother's name is required",
        }),
      motherOccupation: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Mother's occupation is required",
        }),
      motherContactNumber: z
        .string()
        .min(1)
        .refine(value => value.length > 0, {
          message: "Mother's contact number is required",
        }),
    })
    .refine(value => Object.values(value).every(v => v !== ''), {
      message: 'Guardian information is required',
    }),

  profileImage: z
    .string()
    .min(1)
    .refine(value => value.length > 0, {
      message: 'Profile image is required',
    }),

  isActive: z.boolean().refine(value => value !== undefined, {
    message: 'isActive status is required',
  }),
});
