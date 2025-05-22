import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';  // Správný import pro PrismaService
import { CreateAuthDto } from './dto/create-auth.dto';
import { Prisma, User } from '@prisma/client';  // Import z Prisma Clientu

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // Metoda pro hledání uživatele podle tokenu
  async findUserByToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { token },
    });
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return user !== null;
  }
}