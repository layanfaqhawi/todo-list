import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { Todo } from './entities/todo.entity';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  await app.listen(3000);
}
bootstrap();
