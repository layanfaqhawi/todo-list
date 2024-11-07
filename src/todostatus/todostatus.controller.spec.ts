import { Test, TestingModule } from '@nestjs/testing';
import { TodostatusController } from './todostatus.controller';
import { TodostatusService } from './todostatus.service';

describe('TodostatusController', () => {
  let controller: TodostatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodostatusController],
      providers: [TodostatusService],
    }).compile();

    controller = module.get<TodostatusController>(TodostatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
