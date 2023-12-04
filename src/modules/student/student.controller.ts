import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleStudentFromDB(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const patchStudent = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await StudentServices.updateStudent(req.params.id, body);
    res.status(200).json({
      success: true,
      message: 'Student update successfully',
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getStudent,
  patchStudent,
};
