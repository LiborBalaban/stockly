import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';

@UseGuards(AdminGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto, @Request() req) {
    const companyId = req.user.companyId;
    return this.warehousesService.create(createWarehouseDto, companyId);
  }

  @Get()
  findAll(@Request() req) {
    const companyId = req.user.companyId;
    return this.warehousesService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto, @Request() req) {
    const companyId = req.user.companyId;
    return this.warehousesService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehousesService.remove(+id);
  }
}
