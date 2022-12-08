import { ObjectId } from 'mongoose';

declare global {
  namespace Express {
    interface User extends UserData {
      username: string;
      password: string;
      deposit: number;
      role: UserRole;
      _id: ObjectId;
    }
  }
}

export class UserData {
  username: string;
  password: string;
  deposit: number;
  role: UserRole;
}

export type UserRole = 'buyer' | 'seller';
