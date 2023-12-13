/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summar' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TCodeMapper = {
  [key: string]: string;
};

export interface TAcademicSemesterModel extends Model<TAcademicSemester> {
  isAcademicSemesterExist(
    id: Types.ObjectId,
  ): Promise<TAcademicSemester | null>;
}
