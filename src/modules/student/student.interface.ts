/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, Types } from 'mongoose';

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
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImage: string;
  isDeleted: boolean;
}

// for instance methods
export type TStudentMethods = {
  isEmailUserExist(email: string): Promise<void>;
};

// for static methods
export interface TStudentModel
  extends Model<TStudent, Record<string, never>, TStudentMethods> {
  isIdUserExist(
    id: string,
  ): Promise<HydratedDocument<TStudent, TStudentMethods>>;
}
