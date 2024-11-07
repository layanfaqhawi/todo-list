import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodostatusService } from './todostatus.service';
import { CreateTodostatusDto } from './dto/create-todostatus.dto';
import { UpdateTodostatusDto } from './dto/update-todostatus.dto';
import {Todo as TodoModel} from '@prisma/client';

@Controller('todostatus')
export class TodostatusController {
  constructor(private readonly todostatusService: TodostatusService) {}

  @Post()
  create(@Body() createTodostatusDto: CreateTodostatusDto) {
    return this.todostatusService.create(createTodostatusDto);
  }

  @Get()
  findAll() {
    return this.todostatusService.todostatuses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todostatusService.todostatus({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodostatusDto: UpdateTodostatusDto) {
    return this.todostatusService.update(+id, updateTodostatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todostatusService.delete(+id);
  }
}
