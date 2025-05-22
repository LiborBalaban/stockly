import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RoleRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllRoles(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }
}