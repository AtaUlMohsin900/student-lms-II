import { IsEmail, IsString, MinLength } from "class-validator";

export class SignupDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
  role: import("c:/Users/ataulmohsin/Desktop/student-lms-II/backend/src/users/enums/users.enms").UserRole;
  name: any;
}
