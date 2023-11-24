/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TStudent, TStudentModel } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const studentSchema = new Schema<TStudent, TStudentModel>({
  id: { type: String },
  password: { type: String, required: true },
  // Name information
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
        unique: true,
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
      values: ['male', 'female'],
      message: 'Gender must be either "male" or "female".',
    },
    required: [true, 'Gender is required'],
  },

  // Contact information
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: async (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email format',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },

  // Additional personal information
  dateOfBirth: { type: String },
  bloodGroup: { type: String },
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
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    fatherContactNumber: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required"],
    },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    motherContactNumber: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
  },

  // Miscellaneous information
  profileImage: {
    type: String,
    required: [true, 'Profile image is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive status is required'],
  },
});

// pre save middleware/hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  //hashing password and save in mongo
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//creating a custom instace method
// studentSchema.methods.isUserExists = async function (email: string) {
//   const existingUser = await Student.findOne({ email: email });
//   return existingUser;
// };

//creating a custom static method
studentSchema.statics.isUserExists = async (email: string) => {
  const existingUser = await Student.findOne({ email: email });
  return existingUser;
};
export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
