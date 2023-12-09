import config from '../../config';
import { TAcademicSemester } from '../acamdemicSemister/academicSemester.interface';
import { AcademicSemester } from '../acamdemicSemister/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TNewUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStudentIntoDB = async (password: any, payload: TStudent) => {
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //create a user object
  const userData: TNewUser = {
    id: await generatedStudentId(admissionSemester as TAcademicSemester),
    password: password || (config.default_password as string),
    role: 'student',
  };

  //create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
