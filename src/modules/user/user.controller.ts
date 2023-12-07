import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import { UserValidation } from './user.validation';
import { studentValidationZod } from '../student/student.validation.zod';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student } = req.body;
    const studentResult = studentValidationZod.parse(student);
    let passResult;
    if (password) {
      passResult = UserValidation.userValidationSchema.parse(password);
    }
    const result = await UserServices.createStudentIntoDB(
      passResult,
      studentResult,
    );
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
