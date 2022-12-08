import { Schema, model } from 'mongoose';
import { CreateUserDto as UserSchema } from '../dto/create-user.dto';
export const requiredString = { type: String, required: true };

const userSchema = new Schema<UserSchema>({
  username: { ...requiredString, unique: true },
  password: requiredString,
  role: { type: String, enum: ['buyer', 'seller'] },
  deposit: { type: Number, default: 0 },
});

export const User = model<UserSchema>('User', userSchema);
