import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './positions.repository';

@Injectable()
export class PositionsService {
  constructor(private readonly repo: PositionRepository) {}
  async create(createPositionDto: CreatePositionDto) {
    try {
        const createdPosition = await this.repo.create(createPositionDto)
    
        if(createdPosition){
          return {
            message:"Vytvoření pozice proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při vytváření pozice:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při vytváření pozice.',
          );
        }
  }

 async findAllByCompany(companyId: number) {

    try {
        const positions = await this.repo.findAllByCompany(companyId);
    
        if(positions){
          return {
            documents:positions,
            message:"Hledání pozic proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pozic:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pozic.',
          );
        }
  }

   async findAllByStorage(storageId: number) {
    try {
        const positions = await this.repo.findAllByStorage(storageId);
    
        if(positions){
          return {
            documents:positions,
            message:"Hledání pozic proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pozic:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pozic.',
          );
        }
  }

   async findAllByProductAndStorage(productId:number, storageId: number) {
    try {
        const positions = await this.repo.findAllByProductadnStorage(productId, storageId);
    
        if(positions){
          return {
            documents:positions,
            message:"Hledání pozic proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pozic:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pozic.',
          );
        }
  }

  async findOne(id: number) {
    
     try {
        const position = await this.repo.findOne(id);
    
        if(position){
          return {
            documents:position,
            message:"Hledání pozice proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pozice:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pozice.',
          );
        }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
     try {
        const updatedPosition = await this.repo.update(updatePositionDto, id);
    
        if(updatedPosition){
          return {
            message:"Aktualizace pozice proběhla správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pozice:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pozice.',
          );
        }
  }

  async remove(id: number) {
    try {
        const deletedPosition = await this.repo.delete(id);;
    
        if(deletedPosition){
          return {
            message:"Smazání pozice proběhlo správně"
          }
        }
        } catch (error) {
          console.error('Chyba při mazání pozice:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání pozice.',
          );
        }
  }
}
