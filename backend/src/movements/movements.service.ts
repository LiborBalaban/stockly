// movement.service.ts
import * as ExcelJS from 'exceljs';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MovementRepository } from './movements.repository';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { CreateStockTransactionDto } from './dto/create-transaction';
import { Prisma, Stock, StockMovement, StockTransaction } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class MovementService {
  constructor(private readonly movementRepository: MovementRepository) {}

  async exportMovementToExcel(movementId: number, res: Response) {
  const movement = await this.movementRepository.findMovementsInfo(movementId);
  const items = await this.movementRepository.findItems(movementId);

  if (!movement) {
    throw new NotFoundException('Pohyb nebyl nalezen.');
  }

  const workbook = new ExcelJS.Workbook();

  // Sheet 1: Info o pohybu
  const sheet1 = workbook.addWorksheet('Pohyb');
  sheet1.addRow(['ID', 'Popis', 'Faktura', 'Datum', 'Sklad', 'Dodavatel']);
  sheet1.addRow([
    movement.id,
    movement.description,
    movement.invoiceNumber,
    movement.date,
    movement.storage?.name || '',
    movement.supplier?.name || '',
  ]);

  // Sheet 2: Položky pohybu
  const sheet2 = workbook.addWorksheet('Položky');
  sheet2.addRow(['Produkt', 'Množství', 'Cena', 'Pozice']);

  for (const item of items) {
    sheet2.addRow([
      item.product?.name || '',
      item.quantity,
      item.price,
      item.position?.name || '',
    ]);
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=pohyb-${movement.id}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
}

  async findAllByCompany(companyId: number){
     try {
        const movements = await this.movementRepository.findAllByCompany(companyId);
    
        if(movements){
          return {
            documents:movements,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async findAllByUser(userId: number) {
    try {
        const movements = await this.movementRepository.findAllByUser(userId);
    
        if(movements){
          return {
            documents:movements,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async getProductStock(id: number) {
    
    try {
        const stocks = await this.movementRepository.getProductStock(id);
    
        if(stocks){
          return {
            documents:stocks,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

   async getMovementInfo(id: number) {
    
    try {
        const stocks = await this.movementRepository.findMovementsInfo(id);
    
        if(stocks){
          return {
            documents:stocks,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async getProductStockStorage(productId: number, storageId: number) {
   
     try {
        const stocks = await this.movementRepository.getProductStockStorage(productId, storageId);
    
        if(stocks){
          return {
            documents:stocks,
            message:"Stocks byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

    async getMovementItems(id:number) {
   
     try {
        const items = await this.movementRepository.findItems(id);
    
        if(items){
          return {
            documents:items,
            message:"Stocks byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async createMovement(dto: CreateMovementDto, userId: number, defaultStorageId: number) {
  const storageId = dto.stockDetails.storageId || defaultStorageId;
  const movement = await this.movementRepository.createStocking({
    user:{connect: {id:userId}},
    storage:{connect: {id:storageId}},
    type:{connect: {id:dto.typeMovement}},
    date: new Date(),
     ...(dto.stockDetails.supplierId
    ? {
        supplier: {
          connect: { id: dto.stockDetails.supplierId },
        },
      }
    : {}),
    description: dto.stockDetails.description,
    invoiceNumber: dto.stockDetails.invoiceNumber,
    expectedDelivery: {connect:{id:dto.expectedDelivery}}
  });

  const promises = dto.products.map(async (product) => {
  await this.movementRepository.createStockTransaction({
    movement: { connect: { id: movement.id } },
    product: { connect: { id: product.id } },
    quantity: product.quantity,
    price: product.price,
    storage: { connect: { id: storageId } },
    position: { connect: { id: product.positionId } },
  });

 const existingStock = await this.movementRepository.findStock(product.id, storageId);
const quantityChange = dto.typeMovement === 2 ? -product.quantity : product.quantity;

if (existingStock && existingStock.length > 0 && existingStock[0]?.id) {
  await this.movementRepository.updateStock(existingStock[0].id, quantityChange);
} else {
  await this.movementRepository.createStock({
    products: { connect: { id: product.id } },
    storageId: storageId,
    quantity: quantityChange,
  });
}

  if (product.positionId) {
    const existingPositionProduct = await this.movementRepository.findPositionProduct(
      product.id,
      product.positionId,
    );

    if (existingPositionProduct) {
      const updated = await this.movementRepository.updatedPositionStock(
        existingPositionProduct.id,
        quantityChange,
      );

      if (updated.quantity <= 0) {
        await this.movementRepository.delete(updated.id);
      }
    } else {
      await this.movementRepository.createPositionProduct({
        product: { connect: { id: product.id } },
        position: { connect: { id: product.positionId } },
        quantity: quantityChange,
      });
    }
  }
});

  await Promise.all(promises);
}
}