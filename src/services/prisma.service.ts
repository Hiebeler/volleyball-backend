import { PrismaClient } from '@prisma/client';
import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    console.log('PrismaService initialized');
  }
}
