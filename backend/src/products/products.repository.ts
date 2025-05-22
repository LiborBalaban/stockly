import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from '@prisma/client';
import { Stock } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository{
  constructor(private readonly prisma: PrismaService) {}

findAllByCompany(companyId: number): Promise<Product[]> {
  return this.prisma.product.findMany({
    where: {
      companyId,
    },
    include: {
      category: true,
      position: true,
      images: {
        take: 1,
      },
      StockTransaction: {
        take: 1,
        orderBy: {
          movement: {
            date: 'desc',
          },
        },
        include: {
          movement: {
            select: {
              date: true,
              type: true,
            },
          },
        },
      },
      stocks: {
        select: {
          productId: true,
          quantity: true,
          storageId: true,
        },
      },
    },
  });
}

findAllByStorage(storageId: number): Promise<Product[]> {
  return this.prisma.product.findMany({
    where: {
      stocks: {
        some: {
          storageId: storageId,
        },
      },
    },
    include: {
      category: true,
      position: true,
      images: {
        take: 1,
      },
      stocks: {
        where: {
          storageId: storageId,
        },
        select: {
          quantity: true,
          storageId: true,
        },
      },
      StockTransaction: {
        where: {
          storageId: storageId, // filtrujeme pohyby pouze pro daný sklad
        },
        take: 1,
        orderBy: {
          movement: {
            date: 'desc',
          },
        },
        include: {
          movement: {
            select: {
              date: true,
              type: true,
            },
          },
        },
      },
    },
  });
}

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
        where: {
                id
            }
      });
  }

findStocks(productId: number, storageId: number): Promise<Stock[]> {
  return this.prisma.stock.findMany({
    where: {
      productId,
      storageId,
    },
  });
}

  async create(dto: CreateProductDto, companyId:number): Promise<Product> {
    return this.prisma.product.create({
      data:{
                 name:dto.name,
                 code: dto.code,
                 description: dto.description,
                 categoryId: dto.categoryId,
                 quantity: dto.quantity,
                 positionId:dto.positionId,
                 companyId:companyId
             },
    });
  }

  async update(dto: UpdateProductDto, id: number, companyId:number): Promise<Product> {
    return this.prisma.product.update({
        where:{
            id:id
        },
        data:{
            name:dto.name,
            code: dto.code,
            description: dto.description,
            categoryId: dto.categoryId,
            quantity: dto.quantity,
            positionId:dto.positionId,
            companyId:companyId
         },
    });
  }

  async delete(id: number): Promise<Product> {
      return this.prisma.product.delete({
          where:{
              id:id
          },
      });
    }
}