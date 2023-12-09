import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { academicDepartmentValidations } from './academicDepartment.validations';
import { academicDepartmentControllers } from './academicDepartment.controllers';

const router = express.Router();

router.post(
  '/create',
  validateRequestHandler(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/update/:departmentId',
  validateRequestHandler(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
