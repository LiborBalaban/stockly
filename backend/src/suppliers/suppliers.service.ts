import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './suppliers.repository';

@Injectable()
export class SuppliersService {
  constructor(private readonly repo: SupplierRepository) {}
  async create(dto: CreateSupplierDto, companyId:number) {
    try{
        const created_product = await this.repo.create({
          name:dto.name,
          email:dto.email,
          phone:dto.phone,
          description:dto.description,
          company:{connect:{id:companyId}}
        });
                  
        if(created_product){
            return {
                message: `Dodavatel ${created_product.name} byl úspěšně vytvořen.`,
            };
              }
        }
        catch (error) {
            console.error('Chyba při mazání dodavatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání dodavatele.',
        );
      }
  }

  async findAll(companyId:number) {
    try{
        const suppliers = await this.repo.findAllByCompany(companyId);
                  
        if(suppliers){
            return {
              documents:suppliers,
              message: `Získání dodavatelů proběhlo správně`,
            };
              }
        }
        catch (error) {
            console.error('Chyba při hledání dodavatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání dodavatele.',
        );
      }
  }

  async findOne(id: number) {
  
    try{
        const supplier = await this.repo.findOne(id);
                  
        if(supplier){
            return {
              documents:supplier,
              message: `Získání dodavatele proběhlo správně`,
            };
              }
        }
        catch (error) {
            console.error('Chyba při hledání dodavatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání dodavatele.',
        );
      }
  }

 async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    try{
        const updated_supplier = await this.repo.update(updateSupplierDto, id);
                  
        if(updated_supplier){
            return {
              message: `Dodavatel ${updated_supplier.name} byl úspěšně aktualizován.`,
            };
              }
        }
        catch (error) {
            console.error('Chyba při aktualizaci dodavatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při aktualizaci dodavatele.',
        );
      }
  }

  async remove(id: number) {
    try{
        const deleted_supplier = await this.repo.delete(id);
                  
        if(deleted_supplier){
            return {
              message: `Dodavatel ${deleted_supplier.name} byl úspěšně smazán.`,
            };
              }
        }
        catch (error) {
            console.error('Chyba při mazání dodavatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání dodavatele.',
        );
      }
  }
}
