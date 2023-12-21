import { TAcademicSemester } from '../acamdemicSemister/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};

const findLatestFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id;
};

export const generatedFacultyId = async () => {
  const lastFacultyId = await findLatestFacultyId();
  let currentId = 0;

  if (lastFacultyId) {
    const numericPart = parseInt(lastFacultyId.slice(2), 10);
    currentId = isNaN(numericPart) ? 0 : numericPart;
  }

  const incrementedId = `F-${(currentId + 1).toString().padStart(4, '0')}`;
  return incrementedId;
};

const findLatestAdminId = async () => {
  const lastFaculty = await User.findOne({ role: 'admin' })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id;
};

export const generatedAdminId = async () => {
  const lastAdminId = await findLatestAdminId();
  let currentId = 0;

  if (lastAdminId) {
    const numericPart = parseInt(lastAdminId.slice(2), 10);
    currentId = isNaN(numericPart) ? 0 : numericPart;
  }

  const incrementedId = `A-${(currentId + 1).toString().padStart(4, '0')}`;
  return incrementedId;
};
