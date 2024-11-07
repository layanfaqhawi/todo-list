import { Module } from '@nestjs/common';
import { TodostatusService } from './todostatus.service';
import { TodostatusController } from './todostatus.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [TodostatusController],
  providers: [TodostatusService],
  imports: [PrismaModule]
})
export class TodostatusModule {}
