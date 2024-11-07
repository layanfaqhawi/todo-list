import { Injectable } from '@nestjs/common';
import { CreateTodostatusDto } from './dto/create-todostatus.dto';
import { UpdateTodostatusDto } from './dto/update-todostatus.dto';
import { PrismaService } from "../prisma.service";
import { TodoStatus, Prisma } from '@prisma/client';

@Injectable()
export class TodostatusService {
  constructor(private prisma: PrismaService) {}

  async todostatus(
    todostatusWhereUniqueInput: Prisma.TodoStatusWhereUniqueInput,
  ): Promise <TodoStatus | null > {
    return this.prisma.todoStatus.findUnique({
      where: todostatusWhereUniqueInput,
      include: {
        status: true,
        todo: true,
      }
    });
  }

    async todostatuses(): Promise <TodoStatus[]> {
      return this.prisma.todoStatus.findMany({
        include: {
          status: true,
          todo: true,
        }
      });
    }

    async create(createTodostatusDto: CreateTodostatusDto): Promise <TodoStatus> {
      return this.prisma.todoStatus.create({
        data: {
          todoId: createTodostatusDto.todoId,
          statusId: createTodostatusDto.statusId,
        },
      });
    }

  async update(id: number, updateTodostatusDto: UpdateTodostatusDto): Promise <TodoStatus> {
    return this.update(id, updateTodostatusDto);
  }

  async delete(id: number): Promise <TodoStatus> {
    return this.prisma.todoStatus.delete({
      where: {
        id,
      },
    });
  }
}