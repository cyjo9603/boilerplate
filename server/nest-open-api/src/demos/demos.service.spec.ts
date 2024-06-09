import { Test, TestingModule } from '@nestjs/testing';
import { DemosService } from './demos.service';

describe('DemosService', () => {
  let service: DemosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemosService],
    }).compile();

    service = module.get<DemosService>(DemosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
