import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';
import { AuthGuard } from '../guards/auth.guard';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAllByComapny(@Request() req) {
    const companyId = req.user.companyId;
    return this.positionsService.findAllByCompany(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('by-storage/:storageId')
  findAllByStorage(@Param('storageId') id: string) {
  return this.positionsService.findAllByStorage(+id);
  }

  @UseGuards(AuthGuard)
  @Get('by-storage')
  findAllByStorageBody(@Request() req, @Body('storageId') storageIdFromBody: number) {
  const storageId = storageIdFromBody ?? req.user?.storageId;
  return this.positionsService.findAllByStorage(storageId);
  }

  @UseGuards(AuthGuard)
  @Get('by-storage/:storageId/product/:productId')
  findAllByStorageAndProduct(@Param('storageId') storageId: string, @Param('productId') productId: string,) {
  return this.positionsService.findAllByProductAndStorage(+productId, +storageId);
  }

   @UseGuards(AuthGuard)
  @Get('by-storage/:productId/product')
  findAllByStorageAndProductUser(@Param('productId') productId: string, @Request() req) {
  const storageId = req.user.storageId;
  return this.positionsService.findAllByProductAndStorage(+productId, storageId);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}
