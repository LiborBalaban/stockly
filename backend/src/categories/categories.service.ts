import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoryRepository) {}

  async create(dto: CreateCategoryDto , companyId:number) {
    try {
      const createdCategory = await this.repo.create({
      name:dto.name,
      description:dto.description,
      position: dto.positionId ? { connect: { id: dto.positionId } } : undefined,
      company: { connect: { id: companyId } }
    });

    if(createdCategory){
      return {
        message:"Uložení kategorie proběhlo správně"
      }
    }
    } catch (error) {
      console.error('Chyba při vytváření kateogire:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při vytváření kategorie.',
      );
    }
  }

  async findAll(companyId: number) {
     try {
      const categories = await this.repo.findAllByCompany(companyId);

    if(categories){
      return {
        documents:categories,
        message:"Kategorie byly získáný správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání kategorií:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání kategorií.',
      );
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.repo.findOne(id);

    if(category){
      return {
        documents:category,
        message:"Kategorie byla získána správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání kategorie:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání kategorie.',
      );
    }
  }

  async update(id: number, companyId:number, dto: UpdateCategoryDto) {
  try {
      const updatedCategory = await this.repo.update(id, {
      name: dto.name,
      description: dto.description,
      position: dto.positionId ? { connect: { id: dto.positionId } } : undefined,
      company: { connect: { id: companyId } }
    });

    if(updatedCategory){
      return {
        message:"Aktualizace kategorie proběhlo správně"
      }
    }
    } catch (error) {
      console.error('Chyba při aktualizaci kateogire:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při aktualizaci kategorie.',
      );
    }
  }

  async remove(id: number) {
     try {
      const deletedCategory = await this.repo.delete(id)

    if(deletedCategory){
      return {
        message:"Smazán kategorie proběhlo správně"
      }
    }
    } catch (error) {
      console.error('Chyba při mazání kateogire:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při mazání kategorie.',
      );
    }
  }
}
