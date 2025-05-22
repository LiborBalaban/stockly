import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, ExpectedDelivery, ExpectedDeliveryItem, Product } from '@prisma/client';
import { StockTransaction } from '@prisma/client';
import { PositionProduct } from '@prisma/client';
import { CreateExpectedDeliveryDto } from './dto/create-expected-delivery.dto';

@Injectable()
export class ExpectedDeliveryRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<ExpectedDelivery[]> {
    return this.prisma.expectedDelivery.findMany({
       where: {
          uploadedBy: {
            companyId
          },
        },
        include: {
          uploadedBy: {
            select: {
              name: true,
            },
          },
          supplier:{
            select:{
                name:true
            }
          },
          storage:{
            select:{
                name:true
            }
          },
          items:{
            select:{
                id:true
            }
          }
        },
    });
  }

  getProductId(name:string): Promise<{ id: number } | null>{
    return this.prisma.product.findFirst({
        where: { name },
        select: { id: true },
      });
  }

   findAllByUser(userId: number): Promise<ExpectedDelivery[]> {
    return this.prisma.expectedDelivery.findMany({
       where: {
          inspector: {
            id:userId
          },
        },
        include: {
          uploadedBy: {
            select: {
              name: true,
            },
          },
          supplier:{
            select:{
                name:true
            }
          },
          storage:{
            select:{
                name:true
            }
          },
          items:{
            select:{
                id:true
            }
          }
        },
    });
  }


   getExpectedDeliveryItems(deliveryId: number): Promise<ExpectedDeliveryItem[]> {
    return this.prisma.expectedDeliveryItem.findMany({
         where: {
                  deliveryId
                },
    });
  }

  getExpectedDelivery(id: number): Promise<ExpectedDelivery | null> {
    return this.prisma.expectedDelivery.findUnique({
         where: {id},
    });
  }

  createExpectedDelivery(data: Prisma.ExpectedDeliveryCreateInput): Promise<ExpectedDelivery > {
    return this.prisma.expectedDelivery.create({
     data
    });
  }

createExpectedDeliveryItem(data:Prisma.ExpectedDeliveryItemCreateInput): Promise<ExpectedDeliveryItem> {
    return this.prisma.expectedDeliveryItem.create({
      data
    });
  }
}