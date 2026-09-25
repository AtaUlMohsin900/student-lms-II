import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserStatus } from "src/users/enums/users.enms";
import { AuthGuard } from "@nestjs/passport";



@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    getAuthenticationOptions(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const role = request.query?.role;
        if (role === 'student' || role === 'instructor') {
            return { state: JSON.stringify({ role }) }
        }
        return {};

    }
}