import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseRepository } from './warehouses.repository';

@Injectable()
export class WarehousesService {
  constructor(private readonly repo: WarehouseRepository) {}
  async create(dto: CreateWarehouseDto, companyId:number) {

     try {
          const createdWarehouse = await this.repo.create({
              name:dto.name,
              phone:dto.phone,
              psc:Number(dto.psc),
              address:dto.address,
              company:{connect:{id:companyId}},
              city:dto.city
          });
    
        if(createdWarehouse){
          return {
            message:"Uložení skladu proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při vytváření skladu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při vytváření skladu.',
          );
        }
    
  }

  async findAll(companyId:number) {
   
    try {
          const warehouses = await this.repo.findAllByCompany(companyId);
    
        if(warehouses){
          return {
            documents:warehouses,
            message:"získání skladů problěhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při získávání skladů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při získávání skladů.',
          );
        }
  }

  async findOne(id: number) {
    
    try {
          const warehouse = await this.repo.findOne(id);
    
        if(warehouse){
          return {
            documents:warehouse,
            message:"získání skladu problěhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při získávání skladu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při získávání skladu.',
          );
        }
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
   
     try {
          const updated_warehouse = await this.repo.update(updateWarehouseDto, id);
    
        if(updated_warehouse){
          return {
            message:"Aktualizace skladu problěhla správně"
          }
        }
        } catch (error) {
          console.error('Chyba při aktualizaci skladu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při aktualizaci skladu.',
          );
        }
  }

  async remove(id: number) {

    try {
          const deleted_warehouse = await this.repo.delete(id);
    
        if(deleted_warehouse){
          return {
            message:"Smazání skladu problěhla správně"
          }
        }
        } catch (error) {
          console.error('Chyba při mazání skladu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání skladu.',
          );
        }
  }
}
