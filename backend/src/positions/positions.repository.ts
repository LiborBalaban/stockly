import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Position, Prisma, PositionProduct } from '@prisma/client';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<Position[]> {
    return this.prisma.position.findMany({
      where: {
                storage: {
                  company: {
                    id: companyId,
                  },
                },
              },
    });
  }

  findAllByProductadnStorage(productId:number, storageId:number): Promise<PositionProduct[]> {
    return this.prisma.positionProduct.findMany({
      where: {
                productId,
                position: {
                    storageId
                }
            },
            include: {
                position: true 
            }
    });
  }

  findAllByStorage(storageId: number): Promise<Position[]> {
    return this.prisma.position.findMany({
      where: {
              storageId
            },
    });
  }

  findOne(id: number): Promise<Position | null> {
    return this.prisma.position.findUnique({
         where: {
              id
            },
      });
  }

  async create(data: Prisma.PositionCreateInput): Promise<Position> {
    return this.prisma.position.create({ data });
  }

  async update(data: Prisma.PositionUpdateInput, id:number): Promise<Position> {
    return this.prisma.position.update({
        where:{
            id
        },
       data
    });
  }

  async delete(id: number): Promise<Position> {
    return this.prisma.position.delete({
        where:{
            id
        },
    });
  }
}