import bcrypt from 'bcrypt';
import { ApiError } from '../errors/apiError';
import jwt, { type Secret } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class AuthService {
  async login(password: string): Promise<string> {
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    console.log(adminPasswordHash);
    console.log(password);
    if (!adminPasswordHash) {
      throw new ApiError('an unexpected error occured', 500);
    }
    const valid = await bcrypt.compare(password, adminPasswordHash);
    console.log(valid);
    if (!valid) {
      throw new ApiError('wrong password', 400);
    }
    const jwt = this.createJWT();
    return jwt;
  }

  createJWT(): string {
    return jwt.sign({}, process.env.JWT_SECRET as Secret, {
      expiresIn: '1y',
    });
  }
}
