import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TodoDbModule } from './todo-db/todo-db.module';
import { StatusModule } from './status/status.module';
import { TodostatusModule } from './todostatus/todostatus.module';

@Module({
  imports: [TodoModule, TodoDbModule, StatusModule, TodostatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
