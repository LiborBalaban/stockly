import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto , @Request() req) {
    const comapnyId = req.user.companyId;
    return this.suppliersService.create(createSupplierDto, comapnyId);
  }

@UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const comapnyId = req.user.companyId;
    return this.suppliersService.findAll(comapnyId);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto , @Request() req) {
    const comapnyId = req.user.companyId;
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
