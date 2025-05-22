import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Company, Prisma } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository{
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({
        where: { id },
      });
  }

  findCompanyName(id: number): Promise<{ name: string } | null> {
  return this.prisma.company.findUnique({
    where: { id },
    select: {
      name: true
    }
  });
}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({ data });
  }

  async update(data: Prisma.CompanyUpdateInput, id: number): Promise<Company> {
    return this.prisma.company.update({
        where:{ id },
        data
    });
  }
}