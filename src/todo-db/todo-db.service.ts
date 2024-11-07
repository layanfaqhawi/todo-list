import { Injectable } from '@nestjs/common';
import { CreateTodoDbDto } from './dto/create-todo-db.dto';
import { UpdateTodoDbDto } from './dto/update-todo-db.dto';
import { PrismaService } from "../prisma.service";
import { Todo, Prisma, Status } from '@prisma/client';
import { Status as StatusModel } from '@prisma/client';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class TodoDbService {
  constructor(private prisma: PrismaService) {}

  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise <Todo | null > {
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
      include: {
        logs: {
          orderBy: {
            id: 'asc',
          },
          include: {
            status: true,
          }
        }
      }
    });
  }

  async todos(): Promise <Todo[]> {
    return this.prisma.todo.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        logs: {
          include: {
            status: true,
          }
        }
      }
    });
  }

  async createTodo(createTodoDbDto: CreateTodoDbDto): Promise <Todo > {
    let order = 1;
    let todos = await this.prisma.todo.findMany({
      orderBy: {
        order: 'asc',
      }
    })
    if (!createTodoDbDto.order) {
        let size = todos.length;
        if (size > 0) {
          order = todos[size - 1].order + 1;
      }
    }
    else if (todos.length > 0) {
      createTodoDbDto.order =+ createTodoDbDto.order;
      order = createTodoDbDto.order;
    }

    const statuses = await this.prisma.status.findMany({
      orderBy: {
        id: 'asc',
      }
    });
    let pendingStatus: null | Status =  statuses.length > 0 ? statuses[0] : null;
    if (statuses.length == 0) {
      let data = {
          status: "Pending",
          order: 1
        }
      if (createTodoDbDto.status)
      {
        let data = {
          status: createTodoDbDto.status,
          order: 1
        }
      }
      pendingStatus = await this.prisma.status.create({
        data: data
      });
    }
    else if (createTodoDbDto.status) {
      pendingStatus = await this.prisma.status.findUniqueOrThrow({
        where: {
          status: createTodoDbDto.status,
        }
      });
      }
    const todo = await this.prisma.todo.create({
      data: {
      todo: createTodoDbDto.todo,
      isCompleted: createTodoDbDto.isCompleted ?? false,
      order: order,
      logs:{
        create:{
         statusId: pendingStatus.id,
        }
      }
      },
    });

    return todo;
    }

  async updateTodo(id: number, updateTodoDbDto: UpdateTodoDbDto): Promise <Todo> {
    let todoStatus: null | Status = null;
    if (updateTodoDbDto.status) {
      todoStatus = await this.prisma.status.findUniqueOrThrow({
        where: {
          status: updateTodoDbDto.status,
        }
      });
      
      this.prisma.todoStatus.create({
        data: {
          statusId: todoStatus.id,
          todoId: id,
        }
      });
      }

      let update: Todo;
      if (!todoStatus) {
        update = await this.prisma.todo.update({
        where: {
          id,
        },
        data: {
          todo: updateTodoDbDto.todo,
        },
      });
      }
      else {
      update = await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        todo: updateTodoDbDto.todo,
        logs: {
          create: {
            statusId: todoStatus.id,
          }
        }
      }
    });
  }
    return update;
  }

  async updateOrder(updateTodoDbDto: UpdateTodoDbDto[]): Promise <Todo[]> {
    var size = updateTodoDbDto.length;
    for (let i=0; i<size; i++) {
      updateTodoDbDto[i].order =+ updateTodoDbDto[i].order;
      await this.prisma.todo.update({
        where: {
          id: updateTodoDbDto[i].id,
        },
        data: updateTodoDbDto[i],
      });
    }
    return this.prisma.todo.findMany({
      orderBy: {
        order: 'asc',
      }
    });
  }

  async deleteTodo(
    where: Prisma.TodoWhereUniqueInput,
  ): Promise <Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
