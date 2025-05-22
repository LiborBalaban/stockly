import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findOne(@Request() req) {
    const companyId = req.user.companyId;
    return this.companyService.findOne(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('name')
  findCompanyName(@Request() req) {
    const companyId = req.user.companyId;
    return this.companyService.findName(companyId);
  }

  @UseGuards(AdminGuard)
  @Patch('update')
  update(@Body() updateCompanyDto: UpdateCompanyDto, @Request() req) {
    const companyId = req.user.companyId;
    return this.companyService.update(companyId, updateCompanyDto);
  }
}
