import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { companyId },
    });
  }

  findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
        where: { id },
      });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async update(id:number, data:Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
        where:{ id },
        data
    });
  }

  async delete(id: number): Promise<Category> {
    return this.prisma.category.delete({
        where:{ id },
    });
  }
}