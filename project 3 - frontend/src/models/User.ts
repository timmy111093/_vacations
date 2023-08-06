import Role from '../models/Role';
 interface User {
      userId: number;
      firstName: string;
      lastName: string;
      email:string;
      password: string;
      userRole: Role
}

export default User;