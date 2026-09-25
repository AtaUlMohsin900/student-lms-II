import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserStatus } from "src/users/enums/users.enms";





@Injectable()
export class ActiveUserGaurd implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp()
            .getRequest<{ user?: { status?: UserStatus } }>();

        const status = request.user?.status;
        if (status && status !== UserStatus.ACTIVE) {
            throw new ForbiddenException('Your account is not active. Please contact the administrator.');

        }
        return true;

    }
}