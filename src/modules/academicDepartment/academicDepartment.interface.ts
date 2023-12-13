/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academic_faculty: Types.ObjectId;
};

export type TAcademicDepartmentMethods = {
  isAcademicDepartmentExist(id: string): Promise<TAcademicDepartment | null>;
};

export type TAcademicDepartmentModel = Model<
  TAcademicDepartment,
  Record<string, never>,
  TAcademicDepartmentMethods
>;
