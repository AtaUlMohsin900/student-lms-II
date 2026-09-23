import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/enums/users.enms";



export const ROLES_KEY = 'roles';

export const role = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)