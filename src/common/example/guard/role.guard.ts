import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    SUPERADMIN = "superadmin";
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // const level = request.adminData.grade;
        const roles = this.reflector.get<string[]>("roles", context.getHandler());

        const superadmin = roles?.includes(this.SUPERADMIN);
        return superadmin;
    }
}
