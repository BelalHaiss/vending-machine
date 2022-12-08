import { ObjectId } from 'mongoose';
export class CreateProductDto {
  qty: number;
  cost: number;
  name: string;
  seller: string | ObjectId;
}
