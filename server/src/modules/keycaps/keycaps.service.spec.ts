import { Test, TestingModule } from '@nestjs/testing';
import { KeycapsService } from './keycaps.service';

describe('KeycapsService', () => {
  let service: KeycapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycapsService],
    }).compile();

    service = module.get<KeycapsService>(KeycapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
