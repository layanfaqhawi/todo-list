import { CreateTodostatusDto } from './../../todostatus/dto/create-todostatus.dto';
export class CreateStatusDto {
    id: number;
    status: string;
    order: number;
    logs: CreateTodostatusDto[];
}
