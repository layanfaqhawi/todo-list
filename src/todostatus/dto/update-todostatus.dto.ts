import { PartialType } from '@nestjs/mapped-types';
import { CreateTodostatusDto } from './create-todostatus.dto';

export class UpdateTodostatusDto extends PartialType(CreateTodostatusDto) {}
