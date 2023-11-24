import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.email)) {
    throw new Error('user already exists!');
  }
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.email)) {
  //   throw new Error('user already exists!');
  // }
  // const result = await student.save();
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById({ _id: id });
  return result;
};

const updateStudent = async (id: string, body: TStudent) => {
  const result = await Student.findByIdAndUpdate(id, body);
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudent,
};
