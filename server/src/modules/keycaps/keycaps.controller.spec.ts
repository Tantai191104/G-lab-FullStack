import { Test, TestingModule } from '@nestjs/testing';
import { KeycapsController } from './keycaps.controller';

describe('KeycapsController', () => {
  let controller: KeycapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeycapsController],
    }).compile();

    controller = module.get<KeycapsController>(KeycapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
