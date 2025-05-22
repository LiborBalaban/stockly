import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BadRequestException } from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';
import { AuthGuard } from '../guards/auth.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    const companyId = req.user.companyId;
    return this.productsService.create(createProductDto, companyId);
  }

    @UseGuards(AuthGuard)
  @Get('by-company')
  findAllByCompany(@Request() req) {
    const companyId = req.user.companyId;
    return this.productsService.findAllByCompany(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('by-storage')
  findAllByStorage(@Request() req, @Body() body: { storageId?: number }) {
  const storageId = req.user?.storageId ?? body.storageId;
  if (!storageId) {
    throw new BadRequestException('Nebyl poskytnut žádný storageId.');
  }

  return this.productsService.findAllByStorage(storageId);
}

  @UseGuards(AuthGuard)
  @Get('by-storage/:id')
  findAllByStorageById(@Param('id') id: string) {
  return this.productsService.findAllByStorage(+id);
}


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get(':productId/stock/:storageId')
  getProductStock(
  @Param('productId') productId: string,
  @Param('storageId') storageIdParam: string,
  @Request() req,
) {
  const userStorageId = req.user?.storageId;
  const storageId = storageIdParam ? parseInt(storageIdParam, 10) : userStorageId;

  if (!storageId) {
    throw new BadRequestException('Chybí storageId v URL nebo v uživatelském účtu.');
  }

  return this.productsService.findProductStock(+productId, storageId);
}

@UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
   const companyId = req.user.companyId;
    return this.productsService.update(+id, updateProductDto, companyId);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
