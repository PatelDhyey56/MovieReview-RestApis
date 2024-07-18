import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/database/entity/user.entity';
import { Roles_Key } from './role-permissin.decorator';

@Injectable()
export class RolePermissinGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const requireRoles: UserRole = this.reflector.get(
    //   Roles_Key,
    //   context.getHandler(),
    // );
    // console.log(requireRoles);
    // if (!requireRoles) return true;
    // const { user } = context.switchToHttp().getRequest();
    // console.log(user.role);
    // return requireRoles[0] === user.role;

    // multiple Roles
    const requireRoles: UserRole[] = this.reflector.getAllAndOverride<
      UserRole[]
    >(Roles_Key, [context.getHandler(), context.getClass()]);

    if (!requireRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requireRoles.some((role: UserRole) => user.role?.includes(role));
  }
}
