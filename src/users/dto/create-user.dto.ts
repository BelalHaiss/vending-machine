import { UserData } from 'src/types/exteneds';

export class CreateUserDto implements UserData {
  username: string;
  password: string;
  deposit: number;
  role: UserRole;
}

export type UserRole = 'buyer' | 'seller';
