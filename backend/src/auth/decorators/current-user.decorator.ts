import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export type JwtUser = {
    id: string;
    email: string;
    role: string;
    status: string;
}

export const currentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): JwtUser | undefined => {
        const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
        return request.user;
    }
)