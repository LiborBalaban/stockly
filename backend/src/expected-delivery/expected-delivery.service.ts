import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateExpectedDeliveryDto } from './dto/create-expected-delivery.dto';
import { UpdateExpectedDeliveryDto } from './dto/update-expected-delivery.dto';
import * as XLSX from 'xlsx';
import { ExpectedDeliveryItemDto } from './dto/expected-delivery-item.dto';
import { ExpectedDeliveryRepository } from './exprected-delivery.repository';

@Injectable()
export class ExpectedDeliveryService {
  constructor(private readonly repo: ExpectedDeliveryRepository) {}
 async createExpectedDelivery(
  dto: CreateExpectedDeliveryDto,
  defaultStorageId: number,
  userId:number
) {
  const storageId = dto.stockDetails.storageId || defaultStorageId;

  const expectedDelivery = await this.repo.createExpectedDelivery({
      uploadedBy: { connect: { id: userId} },
      inspector: {connect: {id:dto.stockDetails.userId}},
      storage: { connect: { id: storageId } },
      type:{connect : {id:dto.typeMovement}},
      supplier: dto.stockDetails.supplierId
      ? { connect: { id: dto.stockDetails.supplierId } }
      : undefined,
      invoiceNumber: dto.stockDetails.invoiceNumber ?? undefined,
  });

  const productPromises = dto.products.map(async(product) =>
    this.repo.createExpectedDeliveryItem({
        delivery: { connect: { id: expectedDelivery.id } },
        product: { connect: { id: product.id } },
        quantity: product.quantity,
        price: product.price,
    })
  );

  await Promise.all(productPromises);

  return {
    documents:expectedDelivery,
    message:"Vytvoření pohybu proběhlo úspěšně"
  };
}

  async parseExcel(fileBuffer: Buffer): Promise<ExpectedDeliveryItemDto[]> {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const items: ExpectedDeliveryItemDto[] = [];

    for (let index = 0; index < jsonData.length; index++) {
      const row: any = jsonData[index];
      const productName = String(row.productName)?.trim();
      const quantity = Number(row.quantity);
      const price = Number(row.price);

      if (!productName || isNaN(quantity) || isNaN(price)) {
        throw new BadRequestException(`Chybí nebo je neplatná hodnota na řádku ${index + 2}`);
      }

      const product = await this.repo.getProductId(productName);

      if (!product) {
        throw new BadRequestException(`Produkt "${productName}" nebyl nalezen (řádek ${index + 2})`);
      }

      items.push({
        id: product.id,
        quantity,
        price,
      });
    }

    return items;
  } catch (error) {
    console.error('Excel parsing error:', error);
    throw new BadRequestException('Chyba při zpracování Excelu');
  }
}

    async findAllByUser(userId: number) {
      try {
          const movements = await this.repo.findAllByUser(userId);
      
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

  async findAll(companyId:number) {
    try {
        const movements = await this.repo.findAllByCompany(companyId);
    
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

 async expectedDeliveryItems(id: number) {
    try {
        const items = await this.repo.getExpectedDeliveryItems(id);
    
        if(items){
          return {
            documents:items,
            message:"Produkty byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async findOne(id: number) {
    try {
      const delivery = await this.repo.getExpectedDelivery(id);

    if(delivery){
      return {
        documents:delivery,
        message:"Pohyb byl získán správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání pohybu:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání pohybu.',
      );
    }
  }

  update(id: number, updateExpectedDeliveryDto: UpdateExpectedDeliveryDto) {
    return `This action updates a #${id} expectedDelivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} expectedDelivery`;
  }
}
