export interface TUser extends TNewUser {
  needPasswordChange: boolean;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export type TNewUser = {
  id: string;
  role: 'admin' | 'student' | 'faculty';
  password: string;
};
