import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDbDto } from './create-todo-db.dto';

export class UpdateTodoDbDto extends PartialType(CreateTodoDbDto) {}

export class UpdateOrderDBbDto {
    id: number;
    order: number;
}
