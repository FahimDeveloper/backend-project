import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TNewUser } from './user.interface';
import { User } from './user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStudentIntoDB = async (password: any, studentData: TStudent) => {
  //create a user object
  const userData: TNewUser = {
    id: crypto.randomUUID(),
    password: password || (config.default_password as string),
    role: 'student',
  };

  //create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
