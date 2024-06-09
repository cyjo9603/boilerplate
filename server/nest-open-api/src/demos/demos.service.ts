import { Injectable } from '@nestjs/common';

@Injectable()
export class DemosService {
  getDemoString() {
    return 'This action returns demo string';
  }
}
