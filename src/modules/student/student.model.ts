/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TStudent, TStudentMethods, TStudentModel } from './student.interface';
import validator from 'validator';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({
  id: { type: String, unique: true, required: [true, 'id is required'] },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  // Name information
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    required: [true, 'Name is required'],
  },

  // Gender information
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender must be either "male" or "female".',
    },
    required: [true, 'Gender is required'],
  },

  // Contact information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: async (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email format',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },

  // Additional personal information
  dateOfBirth: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },

  // Guardian information
  guardian: {
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
    },
    fatherContactNo: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required"],
    },
    motherContactNo: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
  },
  localGuardian: {
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    fatherOccupationContactNo: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    motherOccupationContactNo: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic-semesters',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic-departments',
  },
  // Miscellaneous information
  profileImage: {
    type: String,
    required: [true, 'Profile image is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.methods.isEmailUserExist = async function (email: string) {
  const existingUser = await Student.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, `${email} already exists`);
  }
};

studentSchema.statics.isIdUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist');
  }
};

studentSchema.pre('save', async function (next) {
  const findDepartment = await AcademicDepartmentModel.findById(
    this.academicDepartment,
  );
  if (!findDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
