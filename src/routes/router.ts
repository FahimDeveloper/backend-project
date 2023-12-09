import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/acamdemicSemister/academicSemester.route';

const router = Router();

const modulesRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
