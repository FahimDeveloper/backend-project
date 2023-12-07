import { z } from 'zod';

export const studentValidationZod = z.object({
  name: z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string({ required_error: 'Last name is required' }),
  }),
  gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  contactNo: z.string({ required_error: 'Contact number is required' }),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
  }),
  dateOfBirth: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  guardian: z.object({
    fatherName: z.string({ required_error: "Father's name is required" }),
    fatherContactNo: z.string({
      required_error: "Father's contact number is required",
    }),
    motherName: z.string({ required_error: "Mother's name is required" }),
    motherContactNo: z.string({
      required_error: "Mother's contact number is required",
    }),
  }),
  localGuardian: z.object({
    fatherOccupation: z.string({
      required_error: "Father's occupation is required",
    }),
    fatherOccupationContactNo: z.string({
      required_error: "Father's contact number is required",
    }),
    motherOccupation: z.string({
      required_error: "Mother's occupation is required",
    }),
    motherOccupationContactNo: z.string({
      required_error: "Mother's contact number is required",
    }),
  }),
  profileImage: z.string({ required_error: 'Profile image is required' }),
  isDeleted: z.boolean().default(false),
});
