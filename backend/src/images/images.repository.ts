import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, ProductImage } from '@prisma/client';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAll(productId: number): Promise<ProductImage[]> {
    return this.prisma.productImage.findMany({
      where: { productId },
    });
    
  }

  async upload(data:Prisma.ProductImageCreateInput): Promise<ProductImage> {
    return this.prisma.productImage.create({ data });
  }

  async delete(id: number): Promise<ProductImage> {
    return this.prisma.productImage.delete({
        where:{ id },
    });
  }
}