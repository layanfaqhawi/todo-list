import { Module } from '@nestjs/common';
import { TodoDbService } from './todo-db.service';
import { TodoDbController } from './todo-db.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  controllers: [TodoDbController],
  providers: [TodoDbService],
  imports: [PrismaModule]
})
export class TodoDbModule {}
