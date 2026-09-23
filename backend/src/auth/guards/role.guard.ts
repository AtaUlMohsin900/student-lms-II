import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserRole } from "src/users/enums/users.enms";
import { role, ROLES_KEY } from "../decorators/role.decorator";
import { request } from "http";




@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    CanActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass(),]
        );
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }


        const request = context.switchToHttp()
            .getRequest<{ user?: { role?: UserRole } }>();
        const role = request.user?.role;
        if (!role || !requiredRoles.includes(role)) {
            throw new ForbiddenException('Access Denied');

        }
    }
}