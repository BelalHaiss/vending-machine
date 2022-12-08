import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../dto/create-user.dto';

export const Roles = (role: UserRole) => SetMetadata('roles', role);
