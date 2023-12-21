import { Types } from 'mongoose';

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  designation: string;
  role: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicFaculty: string;
  academicDepartment: string;
  isDeleted: boolean;
}
