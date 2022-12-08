import { Schema, model } from 'mongoose';
import { CreateProductDto as ProductSchema } from '../dto/create-product.dto';
export const requiredString = { type: String, required: true };

const requiredNumber = { type: Number, required: true };
const productSchema = new Schema<ProductSchema>({
  qty: requiredNumber,
  cost: requiredNumber,
  name: requiredString,
  seller: { type: Schema.Types.ObjectId, ref: 'user' },
});

export const Product = model<ProductSchema>('product', productSchema);
