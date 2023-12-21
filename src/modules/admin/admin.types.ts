import { Types } from 'mongoose';

export interface IAdmin {
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
  contactNotes: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
