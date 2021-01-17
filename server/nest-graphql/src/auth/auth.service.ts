import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string) {
    // validate user
    return { id: 0, name: 'username' };
  }
}
