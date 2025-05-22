import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Storage } from '@prisma/client';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseRepository{
  constructor(private readonly prisma: PrismaService) {}

 findAllByCompany(companyId: number): Promise<Storage[]> {
    return this.prisma.storage.findMany({
      where: { companyId },
    });
  }

  findOne(id: number): Promise<Storage | null> {
    return this.prisma.storage.findUnique({
        where: { id },
      });
  }

  async create(data:Prisma.StorageCreateInput): Promise<Storage> {
    return this.prisma.storage.create({data});
  }

  async update(data:Prisma.StorageUpdateInput, id: number): Promise<Storage> {
    return this.prisma.storage.update({
        where:{
            id:id
        },
        data
    });
  }

  async delete(id: number): Promise<Storage> {
      return this.prisma.storage.delete({
          where:{
              id
          },
      });
    }
}