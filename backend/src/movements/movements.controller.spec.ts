import { Test, TestingModule } from '@nestjs/testing';
import { MovementsController } from './movements.controller';
import { MovementService } from './movements.service';

describe('MovementsController', () => {
  let controller: MovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementsController],
      providers: [MovementService],
    }).compile();

    controller = module.get<MovementsController>(MovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
