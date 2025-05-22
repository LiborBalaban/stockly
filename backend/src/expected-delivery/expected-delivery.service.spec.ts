import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedDeliveryService } from './expected-delivery.service';

describe('ExpectedDeliveryService', () => {
  let service: ExpectedDeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedDeliveryService],
    }).compile();

    service = module.get<ExpectedDeliveryService>(ExpectedDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
