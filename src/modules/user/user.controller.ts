import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidation } from './user.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;
    const passResult = UserValidation.userValidationSchema.parse(password);
    const result = await UserServices.createStudentIntoDB(passResult, student);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      error: err,
    });
  }
};

export const userController = {
  createStudent,
};
