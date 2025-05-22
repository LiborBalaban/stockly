import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UseGuards, Req } from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const companyId = req.user.companyId;
    console.log('user payload:', req.user);
    return this.categoriesService.create(createCategoryDto, companyId);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(@Request() req) {
    const companyId = req.user.companyId;
    return this.categoriesService.findAll(companyId);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Request() req) {
    const companyId = req.user.companyId;
    return this.categoriesService.update(+id, companyId, updateCategoryDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
