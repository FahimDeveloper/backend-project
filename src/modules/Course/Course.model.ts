import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from './course.types';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const Course = model<TCourse>('Course', courseSchema);
export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
