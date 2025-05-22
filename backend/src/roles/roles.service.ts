import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
constructor(private readonly repo: RoleRepository) {}
  async findAll() {
    try{
          const roles = await this.repo.findAllRoles();
                  
          if(roles){
              return {
                documents: roles,
                message:`Role byly úspěšně nalezeny.`
              };
          }
          }
          catch (error) {
                 console.error('Bohužel došlo k chybě při hledání rolí.', error);
                throw new InternalServerErrorException(
                'Bohužel došlo k chybě při hledání rolí.',
                );
             }
  }
}
