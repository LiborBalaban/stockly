import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryItemDto } from './dto/inventory-item.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto, @Request( ) req) {
    const userId = req.user.sub;
    return this.inventoryService.createInventory(createInventoryDto, userId);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(@Request() req) {
    const companyId = req.user.companyId;
    return this.inventoryService.findAll(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('storage')
  findByStorage(@Request() req) {
    const storageId = req.user.storageId;
    return this.inventoryService.findAllByStorage(storageId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.inventoryService.finishedInventory(+id);
  }

   @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('items/:id')
  findAllItems(@Param('id') id: string) {
    return this.inventoryService.findAllItmes(+id);
  }

  @UseGuards(AuthGuard)
  @Get('items/:id/unchecked')
  findAllUncheckedItems(@Param('id') id: string) {
    return this.inventoryService.findAllUncheckedItmes(+id);
  }

  @UseGuards(AuthGuard)
  @Get('items/:id/checked')
  findAllCheckedItems(@Param('id') id: string) {
    return this.inventoryService.findAllUCheckedItmes(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('item/:id')
  createInventoryItem(@Param('id') id: string, @Body() createInventoryDto: InventoryItemDto, @Request( ) req) {
    const userId = req.user.sub;
    return this.inventoryService.updateInventoryItem(+id, createInventoryDto, userId);
  }
}
