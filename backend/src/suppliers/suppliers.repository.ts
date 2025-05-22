import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Supplier } from '@prisma/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<Supplier[]> {
    return this.prisma.supplier.findMany({
      where: { companyId },
    });
  }

  findOne(id: number): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({
        where: { 
            id
        },
      });
  }

  async create(data:Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.prisma.supplier.create({ data });
  }

  async update(data:Prisma.SupplierUpdateInput, id: number): Promise<Supplier> {
    return this.prisma.supplier.update({
        where:{
            id
        },
        data
    });
  }

  async delete(id: number): Promise<Supplier> {
    return this.prisma.supplier.delete({
        where:{
            id
        },
    });
  }
}