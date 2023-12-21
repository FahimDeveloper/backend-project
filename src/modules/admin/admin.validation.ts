import { z } from 'zod';

const CreateAdminSchemaValidation = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .min(12, { message: 'Password must be at least 12 characters' })
      .optional(),
    admin: z.object({
      designation: z.string({
        invalid_type_error: 'Designation must be a string',
        required_error: 'Designation is required',
      }),
      role: z.string({
        invalid_type_error: 'Role must be a string',
        required_error: 'Role is required',
      }),
      name: z.object({
        firstName: z.string({
          invalid_type_error: 'First name must be a string',
          required_error: 'First name is required',
        }),
        middleName: z
          .string({ invalid_type_error: 'Middle name must be a string' })
          .nullable()
          .optional(),
        lastName: z.string({
          invalid_type_error: 'Last name must be a string',
          required_error: 'Last name is required',
        }),
      }),
      gender: z.string({
        invalid_type_error: 'Gender must be a string',
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        invalid_type_error: 'Date of birth must be a string',
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          invalid_type_error: 'Email must be a string',
          required_error: 'Email is required',
        })
        .email('Invalid email format'),
      contactNotes: z
        .string({ invalid_type_error: 'Contact notes must be a string' })
        .nullable()
        .optional(),
      emergencyContactNo: z.string({
        invalid_type_error: 'Emergency contact number must be a string',
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        invalid_type_error: 'Present address must be a string',
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        invalid_type_error: 'Permanent address must be a string',
        required_error: 'Permanent address is required',
      }),
      profileImage: z.string({
        invalid_type_error: 'Profile image must be a string',
        required_error: 'Profile image is required',
      }),
      academicDepartment: z.string({
        invalid_type_error: 'Academic department ID must be a string',
        required_error: 'Academic department ID is required',
      }),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const UpdateAdminSchemaValidation = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .min(12, { message: 'Password must be at least 12 characters' })
      .optional(),
    admin: z.object({
      designation: z
        .string({ invalid_type_error: 'Designation must be a string' })
        .optional(),
      role: z
        .string({ invalid_type_error: 'Role must be a string' })
        .optional(),
      name: z
        .object({
          firstName: z
            .string({ invalid_type_error: 'First name must be a string' })
            .optional(),
          middleName: z
            .string({ invalid_type_error: 'Middle name must be a string' })
            .optional(),
          lastName: z
            .string({ invalid_type_error: 'Last name must be a string' })
            .optional(),
        })
        .optional(),
      gender: z
        .string({ invalid_type_error: 'Gender must be a string' })
        .optional(),
      dateOfBirth: z
        .string({ invalid_type_error: 'Date of birth must be a string' })
        .optional(),
      email: z
        .string({ invalid_type_error: 'Email must be a string' })
        .email('Invalid email format')
        .optional(),
      contactNotes: z
        .string({ invalid_type_error: 'Contact notes must be a string' })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error: 'Emergency contact number must be a string',
        })
        .optional(),
      presentAddress: z
        .string({ invalid_type_error: 'Present address must be a string' })
        .optional(),
      permanentAddress: z
        .string({ invalid_type_error: 'Permanent address must be a string' })
        .optional(),
      profileImage: z
        .string({ invalid_type_error: 'Profile image must be a string' })
        .optional(),
      academicDepartment: z
        .string({
          invalid_type_error: 'Academic department ID must be a string',
        })
        .optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

export { CreateAdminSchemaValidation, UpdateAdminSchemaValidation };
