import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from 'src/DTO/createTag.dto';
import { UpdateTagDto } from 'src/DTO/updateTag.dto';
import { Tag } from 'src/entities/tag';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    /**
     * Obtiene todos los tags.
     * @returns Una promesa que resuelve a un array de tags.
     */
    async allTags(): Promise<Tag[]> {
        try {
            return await this.tagRepository.find();
        } catch (error) {
            throw new HttpException('Error al obtener los tags', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Elimina un tag por su ID.
     * @param tagId - El ID del tag a eliminar.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    async deleteTag(tagId: number): Promise<{ message: string }> {
        try {
            const tag = await this.tagRepository.findOne({ where: { id: tagId } });
            if (!tag) {
                throw new HttpException('Tag no encontrado', HttpStatus.NOT_FOUND);
            }
            await this.tagRepository.remove(tag);
            return { message: 'Tag eliminado exitosamente' };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al eliminar el tag', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Actualiza un tag.
     * @param updateTagDto - DTO que contiene los datos de actualización del tag.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    async updateTag(updateTagDto: UpdateTagDto): Promise<{ message: string }> {
        const { id, name, color } = updateTagDto;

        try {
            const existTag = await this.tagRepository.findOne({ where: { id } });
            if (!existTag) {
                throw new HttpException('Tag no encontrado', HttpStatus.NOT_FOUND);
            }

            if (name !== null) {
                existTag.name = name;
            }
            if (color !== null) {
                existTag.color = color;
            }

            await this.tagRepository.save(existTag);
            return { message: 'Tag actualizado exitosamente' };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al actualizar el tag', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Crea un nuevo tag.
     * @param createTagDto - DTO que contiene los datos de creación del tag.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    async createTag(createTagDto: CreateTagDto): Promise<{ message: string }> {
        const { name, color } = createTagDto;

        if (!name) {
            throw new HttpException('El nombre es requerido', HttpStatus.BAD_REQUEST);
        }

        try {
            const newTag = this.tagRepository.create({ name, color });
            await this.tagRepository.save(newTag);
            return { message: 'Tag creado exitosamente' };
        } catch (error) {
            throw new HttpException('Error al crear el tag', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
