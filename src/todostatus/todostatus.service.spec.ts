import { Test, TestingModule } from '@nestjs/testing';
import { TodostatusService } from './todostatus.service';

describe('TodostatusService', () => {
  let service: TodostatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodostatusService],
    }).compile();

    service = module.get<TodostatusService>(TodostatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
