import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from "../prisma.service";
import { Status, Prisma } from '@prisma/client';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async status(
    statusWhereUniqueInput: Prisma.StatusWhereUniqueInput,
  ): Promise <Status | null> {
    return this.prisma.status.findUnique({
      where: statusWhereUniqueInput,
      include: {
        logs: {
          orderBy: {
            id: 'asc',
          },
          include: {
            todo: true,
          }
        }
      }
    });
  }

  async statuses(): Promise <Status[]> {
    return this.prisma.status.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        logs: {
          include: {
            todo: true,
          }
      }
    }
    });
  }

  async createStatus(createStatusDto: CreateStatusDto): Promise <Status> {
    let order = 1;
    const statuses = await this.prisma.status.findMany({
      orderBy: {
        order: 'asc',
      }
    })
    if (!createStatusDto.order) {
        let size = statuses.length;
        if (size > 0) {
          order = statuses[size - 1].order + 1;
      }
    }
    else if (statuses.length > 0) {
      createStatusDto.order =+ createStatusDto.order;
      order = createStatusDto.order;
    }
    return this.prisma.status.create({
      data: {
        status: createStatusDto.status,
        order: order,
      },
    });
      
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise <Status> {
    return this.prisma.status.update({
      where: {
        id,
      },
      data: {
        status: updateStatusDto.status,
      },
    });
  }

  async updateOrder(updateStatusDto: UpdateStatusDto[]): Promise <Status[]> {
    var size = updateStatusDto.length;
    for (let i=0; i<size; i++) {
      updateStatusDto[i].order =+ updateStatusDto[i].order;
      await this.prisma.status.update({
        where: {
          id: updateStatusDto[i].id,
        },
        data: {
          order: updateStatusDto[i].order,
        }
      });
    }
    return this.prisma.status.findMany({
      orderBy: {
        order: 'asc',
      }
    });
  
  }

  async deleteStatus(
    where: Prisma.StatusWhereUniqueInput
  ): Promise <Status> {
    return this.prisma.status.delete({
      where: where,
    });
  }

}
