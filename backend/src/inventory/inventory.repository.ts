import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Inventory, InventoryItem, Product, Stock, Prisma } from '@prisma/client';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryRepository{
  constructor(private readonly prisma: PrismaService) {}

  findInventoryByCompany(companyId: number): Promise<Inventory[]> {
    return this.prisma.inventory.findMany({
      where:{
        storage:{
            companyId
        }
      }
    });
  }

   findInventoryByStorage(storageId: number): Promise<Inventory[]> {
    return this.prisma.inventory.findMany({
      where:{
        storage:{
            id:storageId
        }
      }
    });
  }

  findOne(id: number): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({
        where: { id },
      });
  }

  async createInventory(data: Prisma.InventoryCreateInput): Promise<Inventory> {
    return this.prisma.inventory.create({ data });
  }

  async finishInventory(id: number): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: { id },
      data: { finishedAt: new Date() },
    });
  }

  async delete(id: number): Promise<Inventory> {
    return this.prisma.inventory.delete({
        where:{ id },
    });
  }


  /*INVENTORY ITEMS*/
  findInventoryItems(inventoryId: number): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany({
      where:{
        inventoryId
      },include:{
        product:true
      }
    });
  }

  findInventoryUncheckedItems(inventoryId: number): Promise<InventoryItem[]> {
  return this.prisma.inventoryItem.findMany({
    where: {
      inventoryId,
      OR: [
        { countedAt: null },
        { realQuantity: null },
        { realQuantity: 0 }
      ]
    },
    include: {
      product: true,    
      countedBy: true      
    }
  });
  }

  findInventoryCheckedItems(inventoryId: number): Promise<InventoryItem[]> {
  return this.prisma.inventoryItem.findMany({
    where: {
      inventoryId,
      countedAt: { not: null },
      realQuantity: { not: null }
    },
    include: {
      product: true,
      countedBy: true
    }
  });
}

  
   async updateInventoryItem(id:number, data: Prisma.InventoryItemUpdateInput): Promise<InventoryItem> {
    return this.prisma.inventoryItem.update({
        where:{
            id
        },
        data 
    });
  }


findProductsByStorage(storageId: number): Promise<(Product & { stocks: Stock[] })[]> {
  return this.prisma.product.findMany({
    where: {
      stocks: {
        some: {
          storageId: storageId,
        },
      },
    },
    include: {
      stocks: {
        where: {
          storageId: storageId,
        },
      },
    },
  });
}

  async importProducts(data: Prisma.InventoryItemCreateManyInput[]): Promise<{ count: number }> {
  return this.prisma.inventoryItem.createMany({ data });
    }   
}