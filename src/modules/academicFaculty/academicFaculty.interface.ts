/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAcademicFaculty = {
  name: string;
};

export interface TAcademicFacultyModel extends Model<TAcademicFaculty> {
  isAcademicFacultyExist(id: string): Promise<void>;
}
