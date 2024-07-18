import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/database/entity/user.entity';

export const Roles_Key = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(Roles_Key, roles);
