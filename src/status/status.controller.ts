import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status as StatusModel } from '@prisma/client';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    // return this.statusService.create(createStatusDto);
    return this.statusService.createStatus(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusService.statuses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.status({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatus(+id, updateStatusDto);
  }

  @Put()
  replace(@Body() updateStatusDto: UpdateStatusDto[]) {
    return this.statusService.updateOrder(updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.deleteStatus({ id: +id });
  }
}
