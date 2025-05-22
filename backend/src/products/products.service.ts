import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductRepository) {}

  async create(createProductDto: CreateProductDto, companyId:number) {
     try{
          const product = await this.repo.create(createProductDto, companyId);
              
          if(product){
              return {
                message: `Produkt ${product.name} byl úspěšně vytvořen.`,
                productId: product.id,
              };
             }
         }
      catch (error) {
             console.error('Chyba při vytváření produktu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při vytváření produktu.',
            );
         }
  }

  async findAllByCompany(companyId:number) {
        try{
          const products = await this.repo.findAllByCompany(companyId);
              
          if(products){
       const productsWithTotal = products.map((product: any) => {
          const totalQuantity = product.stocks?.reduce(
            (sum: number, stock: { quantity: number }) => sum + stock.quantity,
            0
          );

          return {
            ...product,
            totalQuantity,
          };
        });

              return {
                documents: productsWithTotal,
                message:`Produkty byly úspěšně nalezeny.`
              };
             }
         }
      catch (error) {
             console.error('Bohužel došlo k chybě při hledání produktů.', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání produktů.',
            );
         }
  }

   async findAllByStorage(storageId:number) {
        try{
          const products = await this.repo.findAllByStorage(storageId);
              
          if(products){
              return {
                documents: products,
                message:`Produkty byly úspěšně nalezeny.`
              };
             }
         }
      catch (error) {
             console.error('Bohužel došlo k chybě při hledání produktů.', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání produktů.',
            );
         }
  }

async findOne(id: number) {
  try {
    const product = await this.repo.findOne(id); // nebo await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produkt nebyl nalezen.');
    }

    return {
      documents: product,
      message: 'Produkt byl úspěšně nalezen.'
    };
  } catch (error) {
    console.error('Bohužel došlo k chybě při hledání produktu.', error);
    throw new InternalServerErrorException(
      'Bohužel došlo k chybě při hledání produktu.'
    );
  }
}

   async findProductStock(id: number, storageId:number) {
     try{
           const stocks = await this.repo.findStocks(id, storageId);

          if (!stocks) {
          throw new NotFoundException('Produkt nebyl nalezen ve skladu.');
          }

        const totalStock = stocks.reduce((sum, stock) => sum + stock.quantity, 0);
              
        return {
                documents: totalStock,
                message:`Stock byl úspěšně nalezen.`
              };

         }
      catch (error) {
             console.error('Bohužel došlo k chybě při hledání množství na sklad.', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání produktu.',
            );
         }
  }

     async findProductCompanyStock(productId: number) {
     try{
          const stocks = await this.repo.findProductStockSummary(productId);

          if (!stocks) {
          throw new NotFoundException('Produkt nebyl nalezen ve skladu.');
          }

         const totalStock = stocks.reduce((sum, stock) => sum + stock.quantity, 0);
              
        return {
                documents: totalStock,
                message:`Stock byl úspěšně nalezen.`
              };

         }
      catch (error) {
             console.error('Bohužel došlo k chybě při hledání množství na sklad.', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání produktu.',
            );
         }
  }

  async update(id: number, updateProductDto: UpdateProductDto, companyId:number) {
     try{
          const product = await this.repo.update(updateProductDto, id, companyId);
              
          if(product){
              return {
                message: `Produkt ${product.name} byl úspěšně aktualizován.`,
                productId: product.id,
              };
             }
         }
      catch (error) {
             console.error('Chyba při aktualizaci produktu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při aktualizaci produktu.',
            );
         }
  }

  async remove(id: number) {
    try{
          const deleted_product = await this.repo.delete(id);
              
          if(deleted_product){
              return {
                message: `Produkt ${deleted_product.name} byl úspěšně smazán.`,
              };
             }
         }
      catch (error) {
             console.error('Chyba při mazání produktu:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání produktu.',
            );
         }
  }
}
