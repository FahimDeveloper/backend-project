import { model } from 'mongoose';
import { Student, studentSchema } from './student.interface';

export const StudentModel = model<Student>('Student', studentSchema);
