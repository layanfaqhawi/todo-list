import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TodoDbService } from './todo-db.service';
import { CreateTodoDbDto } from './dto/create-todo-db.dto';
import { UpdateTodoDbDto } from './dto/update-todo-db.dto';
import {Todo as TodoModel} from '@prisma/client';

@Controller('todo-db')
export class TodoDbController {
  constructor(private readonly todoDbService: TodoDbService) {}

  @Post()
  create(@Body() createTodoDbDto: CreateTodoDbDto) {
    return this.todoDbService.createTodo(createTodoDbDto);
  }

  @Get()
  findAll() {
    return this.todoDbService.todos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoDbService.todo({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDbDto: UpdateTodoDbDto) {
    return this.todoDbService.updateTodo(+id, updateTodoDbDto);
  }

  @Put()
  replace(@Body() updateTodoDbDto: UpdateTodoDbDto[]) {
    return this.todoDbService.updateOrder(updateTodoDbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoDbService.deleteTodo({ id: +id });
  }
}
