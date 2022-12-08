import mongoose from 'mongoose';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
let conn;

@Injectable()
export class MongooseMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const dbUrl = this.config.get('DB_URL');
      if (!conn) {
        conn = await mongoose.connect(dbUrl);
      }
      next();
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }
}
