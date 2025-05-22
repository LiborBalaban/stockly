import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const companyId = req.user.copmanyid;
    return this.usersService.create(createUserDto, companyId);
  }

  @Get()
  findAll(@Request() req) {
    const companyId = req.user.copmanyid;
    return this.usersService.findAll(companyId);
  }

  @Get('storage/:storageId')
  findAllByStorage(@Param('storageId') storageId: string) {
    return this.usersService.findAllByStorage(+storageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
