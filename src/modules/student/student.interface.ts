/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TStudent {
  id?: string;
  password: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNumber: string;
    motherName: string;
    motherOccupation: string;
    motherContactNumber: string;
  };
  profileImage: string;
  isActive: boolean;
}

//for creating static method
export interface TStudentModel extends Model<TStudent> {
  isUserExists(email: string): Promise<TStudent | null>;
}

// for creating custom instace method
// export type TStudentMethods = {
//   isUserExists(email: string): Promise<TStudent | null>;
// };

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
