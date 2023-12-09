import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/acamdemicSemister/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';

const router = Router();

const modulesRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
  { path: '/academic-faculties', route: academicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
