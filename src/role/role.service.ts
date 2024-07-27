import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    async createRole(data: { name: string }): Promise<Role> {
        const role = this.roleRepository.create(data);
        return await this.roleRepository.save(role);
    }

    async updateRole(roleId: number, data: { name: string }): Promise<Role> {
        await this.roleRepository.update(roleId, data);
        const updatedRole = await this.roleRepository.findOne({where: {id: roleId}});
        if (!updatedRole) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
        return updatedRole;
    }

    async deleteRole(roleId: number): Promise<string> {
        const result = await this.roleRepository.delete(roleId);
        if (result.affected === 0) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
        return 'Role successfully deleted';
    }

    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async getRoleById(roleId: number): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id: roleId}});        if (!role) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }
        return role;
    }
}
