import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, StockMovement } from '@prisma/client';
import { Stock } from '@prisma/client';
import { StockTransaction } from '@prisma/client';
import { PositionProduct } from '@prisma/client';
import { CreateMovementDto } from './dto/create-movement.dto';
import { CreateStockTransactionDto } from './dto/create-transaction';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update.stock.dto';

@Injectable()
export class MovementRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<StockMovement[]> {
    return this.prisma.stockMovement.findMany({
       where: {
          user: {
            companyId
          },
        },
        include: {
          user: {
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
          stockTransaction:{
            select:{
                id:true
            }
          }
        },
    });
  }

   findAllByUser(userId: number): Promise<StockMovement[]> {
    return this.prisma.stockMovement.findMany({
       where: {
          user: {
            id:userId
          }
        },
        include: {
          user: {
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
          stockTransaction:{
            select:{
                id:true
            }
          }
        },
    });
  }


   getProductStock(productId: number): Promise<StockTransaction[]> {
    return this.prisma.stockTransaction.findMany({
         where: {
                  productId: productId
                },
                include: {
                  position:{
                    select:{
                      name:true
                    }
                  },
                  movement: {
                    include: {
                      user: {
                        select:{
                          name:true
                        }
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
                      }
                    },
                  },
                  storage: true,
                },
    });
  }

    getProductStockStorage(productId: number, storageId:number): Promise<StockTransaction[]> {
    return this.prisma.stockTransaction.findMany({
         where: {
              productId: productId,
              storageId: storageId,
            },
            include: {
              position:true,
              movement: {
                include: {
                  user: {
                    select: {
                      name: true,
                    },
                  },
                  supplier: {
                    select: {
                      name: true,
                    },
                  },
                  storage: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              storage: true,
            },
    });
  }


 

  createStocking(data: Prisma.StockMovementCreateInput): Promise<StockMovement> {
    return this.prisma.stockMovement.create({
     data
    });
  }

createStockTransaction(data:Prisma.StockTransactionCreateInput): Promise<StockTransaction> {
    return this.prisma.stockTransaction.create({
      data
    });
  }
 

  async findStock(productId: number, storageId: number) {
  return this.prisma.stock.findMany({
    where: {
      productId,
      storageId,
    },
  });
}

async findItems(movementId: number) {
  return this.prisma.stockTransaction.findMany({
    where: {
      movementId,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
      position:true,
    },
  });
}



async findMovementsInfo(id: number) {
  return this.prisma.stockMovement.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      storage: {
        select: {
          id: true,
          name: true,
        },
      },
      supplier: {
        select: {
          id: true,
          name: true,
        },
      },
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}



  updateStock(stockId:number, quantityChange: number): Promise<Stock> {
    return this.prisma.stock.update({
                  where: { id: stockId }, 
                    data: {
                      quantity: {
                        increment: quantityChange
                      },
                    }
    });
  }

  createStock(data: Prisma.StockCreateInput): Promise<Stock> {
    return this.prisma.stock.create({
      data,
    });
  }

  updatedPositionStock(stockId:number, quantityChange: number): Promise<PositionProduct> {
    return this.prisma.positionProduct.update({
                  where: { id: stockId }, 
                    data: {
                      quantity: {
                        increment: quantityChange
                      },
                    }
    });
  }

  delete(id: number): Promise<PositionProduct> {
      return this.prisma.positionProduct.delete({
          where:{
              id:id
          },
      });
    }

  createPositionProduct(data: Prisma.PositionProductCreateInput): Promise<PositionProduct> {
    return this.prisma.positionProduct.create({ data });
  }

  findPositionProduct(productId: number, positionId: number): Promise<PositionProduct | null> {
  return this.prisma.positionProduct.findFirst({
    where: {
      productId,
      positionId,
    },
  });
}

}