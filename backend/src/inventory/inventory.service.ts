import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryRepository } from './inventory.repository';
import {InventoryItemDto} from './dto/inventory-item.dto'

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}
  async createInventory(createInventoryDto: CreateInventoryDto, userId:number) {
   try {
         const createdInventory = await this.repo.createInventory({
          name:createInventoryDto.name,
          storage:{connect:{id:createInventoryDto.storageId}},
          createdBy:{connect:{id:userId},
          }
         })
   
         const productsInStock = await this.repo.findProductsByStorage(createInventoryDto.storageId);

         const inventoryItems = productsInStock.map((product) => ({
          inventoryId: createdInventory.id,
          productId: product.id,
          expectedQty: product.stocks[0]?.quantity ?? 0,
        }));

        await this.repo.importProducts(inventoryItems)

        return {
          message:'Inventura byla správně vytvořena'
        }

       } catch (error) {
         console.error('Chyba při vytváření kateogire:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při vytváření kategorie.',
         );
       }
  }

   async finishedInventory(id:number) {
   try {
         const finishedInventory = await this.repo.finishInventory(id);
        
   
       if(finishedInventory){
         return {
           message:"Ukončení inventury proběhlo dobře"
         }
       }
       } catch (error) {
         console.error('Chyba při ukončení inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při ukončení inventury.',
         );
       }
  }

  async findAll(companyId:number) {
    try {
         const inventories = await this.repo.findInventoryByCompany(companyId);
        
   
       if(inventories){
         return {
          documents:inventories,
          message:"Hledání inventur proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání inventur:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání inventur.',
         );
       }
  }

   async findAllByStorage(storageId:number) {
    try {
        const inventories = await this.repo.findInventoryByStorage(storageId);
        
   
       if(inventories){
         return {
          documents:inventories,
          message:"Hledání inventur proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání inventur:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání inventur.',
         );
       }
  }
  

  async findOne(id: number) {
    try {
         const inventory = await this.repo.findOne(id);
        
   
       if(inventory){
         return {
          documents:inventory,
          message:"Hledání inventury proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání inventury.',
         );
       }
  }


  async remove(id: number) {
    try {
      const deleted_inventory = await this.repo.delete(id);
        
   
       if(deleted_inventory){
         return {
          message:"Mazání inventury proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při mazání inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při mazání inventury.',
         );
       }
  }


  /**INVETORY ITEMS */
   async findAllItmes(inventoryId:number) {
    try {
      const items = await this.repo.findInventoryItems(inventoryId);
        
   
       if(items){
         return {
          documents:items,
          message:"Hledání pložek proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání položek inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání položek inventury.',
         );
       }
  }

  async findAllUncheckedItmes(inventoryId:number) {
    try {
      const items = await this.repo.findInventoryUncheckedItems(inventoryId);
        
   
       if(items){
         return {
          documents:items,
          message:"Hledání pložek proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání položek inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání položek inventury.',
         );
       }
  }

  async findAllUCheckedItmes(inventoryId:number) {
    try {
      const items = await this.repo.findInventoryCheckedItems(inventoryId);
        
   
       if(items){
         return {
          documents:items,
          message:"Hledání pložek proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při hledání položek inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při hledání položek inventury.',
         );
       }
  }

    async updateInventoryItem(id:number, dto:InventoryItemDto, userId:number) {
    try {
      const updated_item = await this.repo.updateInventoryItem(id,{
        inventory:{connect:{id:dto.inventoryId}},
        product:{connect:{id:dto.productId}},
        countedBy:{connect:{id:userId}},
        realQuantity:dto.realQuantity,
        expectedQty:dto.expectedQty,
        difference:Number(dto.realQuantity) - Number(dto.expectedQty),
        position: dto.position || null,
        countedAt:new Date()
      });
        
   
       if(updated_item){
         return {
          documents:updated_item,
          message:"Vytvoření inventury položky proběhlo správně"
         }
       }
       } catch (error) {
         console.error('Chyba při vytváření položky inventury:', error);
           throw new InternalServerErrorException(
           'Bohužel došlo k chybě při vytváření položeky inventury.',
         );
       }
  }
}
