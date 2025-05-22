import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedDeliveryController } from './expected-delivery.controller';
import { ExpectedDeliveryService } from './expected-delivery.service';

describe('ExpectedDeliveryController', () => {
  let controller: ExpectedDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedDeliveryController],
      providers: [ExpectedDeliveryService],
    }).compile();

    controller = module.get<ExpectedDeliveryController>(ExpectedDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
