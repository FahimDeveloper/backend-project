import { Schema } from 'mongoose';

export interface Student {
  id?: string;
  name: {
    firstName: string;
    middleName: string;
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

export const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: ['male', 'female'],
  email: { type: String, required: true },
  dateOfBirth: { type: String },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: { type: String },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNumber: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNumber: { type: String, required: true },
  },
  profileImage: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});
