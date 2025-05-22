import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UploadedFile } from '@nestjs/common';
import { ExpectedDeliveryService } from './expected-delivery.service';
import { CreateExpectedDeliveryDto } from './dto/create-expected-delivery.dto';
import { UpdateExpectedDeliveryDto } from './dto/update-expected-delivery.dto';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('expected-delivery')
export class ExpectedDeliveryController {
  constructor(private readonly expectedDeliveryService: ExpectedDeliveryService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createExpectedDeliveryDto: CreateExpectedDeliveryDto, @Request() req) {
    const storageId = req.user.storageId;
    const userId = req.user.sub;
    return this.expectedDeliveryService.createExpectedDelivery(createExpectedDeliveryDto, storageId, userId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file) {
    if (!file) {
      throw new Error('Soubor nebyl přijat.');
    }

    // Předej jen file.buffer, služba si ho zpracuje
    return this.expectedDeliveryService.parseExcel(file.buffer);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(@Request() req) {
    const companyId = req.user.companyId;
    return this.expectedDeliveryService.findAll(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findAllByUser(@Request() req) {
    const userId = req.user.sub;
    return this.expectedDeliveryService.findAllByUser(userId);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expectedDeliveryService.findOne(+id);
  }

  @Get('products/:id')
  findAllById(@Param('id') id: string) {
    return this.expectedDeliveryService.expectedDeliveryItems(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpectedDeliveryDto: UpdateExpectedDeliveryDto) {
    return this.expectedDeliveryService.update(+id, updateExpectedDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expectedDeliveryService.remove(+id);
  }
}
