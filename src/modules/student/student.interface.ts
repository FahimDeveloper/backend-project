/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export interface TStudent {
  id?: string;
  user?: Types.ObjectId;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    fatherContactNo: string;
    motherName: string;
    motherContactNo: string;
  };
  localGuardian: {
    fatherOccupation: string;
    fatherOccupationContactNo: string;
    motherOccupation: string;
    motherOccupationContactNo: string;
  };
  profileImage: string;
  isDeleted: boolean;
}

// //for creating static method
// export interface TStudentModel extends Model<TStudent> {
//   isUserExists(email: string): Promise<TStudent | null>;
// }

// for creating custom instace method
// export type TStudentMethods = {
//   isUserExists(email: string): Promise<TStudent | null>;
// };

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
