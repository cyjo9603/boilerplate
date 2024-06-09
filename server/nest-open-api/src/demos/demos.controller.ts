import { Controller, Get } from '@nestjs/common';
import { DemosService } from './demos.service';

@Controller('/api/v1/demos')
export class DemosController {
  constructor(private readonly demosService: DemosService) {}

  @Get('/')
  demo(): string {
    return this.demosService.getDemoString();
  }
}
