import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];

export const academicSemesterCodeMapper: TCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
