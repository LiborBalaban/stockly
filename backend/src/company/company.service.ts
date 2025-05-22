import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly repo: CompanyRepository) {}
  async create(createCompanyDto: CreateCompanyDto) {
     try {
          const createdCompany = await this.repo.create(createCompanyDto);
    
        if(createdCompany){
          return {
            message:"Vytvoření firmy proběhlo správně",
            company: createdCompany,
          }
        }
        } catch (error) {
          console.error('Chyba při vytváření firmy:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při vytváření firmy.',
          );
        }
  }

  async findOne(id: number) {
    try {
          const company = await this.repo.findOne(id);
    
        if(company){
          return {
            documents:company,
            message:"Firma byla úspěšně nalezena"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání firmy:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání firmy.',
          );
        }
  }

  async findName(id: number) {
    try {
          const companyName = await this.repo.findCompanyName(id);
    
        if(companyName){
          return {
            documents:companyName,
            message:"Firma byla úspěšně nalezena"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání firmy:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání firmy.',
          );
        }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
          const updatedCompany = await this.repo.update(updateCompanyDto, id);
    
        if(updatedCompany){
          return {
            message:"Aktualizace firmy proběhla správně"
          }
        }
        } catch (error) {
          console.error('Chyba při aktualizaci firmy:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při aktualizaci firmy.',
          );
        }
  }
}
