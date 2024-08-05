import { Controller, Post, Body, Get, Delete, Put, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/entities/tag';
import { CreateTagDto } from 'src/DTO/createTag.dto';
import { UpdateTagDto } from 'src/DTO/updateTag.dto';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    /**
     * TODO
     * ? Endpoint para obtener todos los tags.
     * @returns Una promesa que resuelve a un array de tags.
     */
    @Get('allTags')
    async allTags(): Promise<Tag[]> {
        try {
            return await this.tagService.allTags();
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * TODO
     * ! Endpoint para eliminar un tag por su ID.
     * @param tagId - El ID del tag a eliminar.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    @Delete('deleteTag/:tag_id')
    async deleteTag(@Param('tag_id') tagId: number): Promise<{ message: string }> {
        try {
            return await this.tagService.deleteTag(tagId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * TODO
     * ! Endpoint para actualizar un tag.
     * @param updateTagDto - DTO que contiene los datos de actualización del tag.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    @Put('updateTag')
    async updateTag(@Body() updateTagDto: UpdateTagDto): Promise<{ message: string }> {
        try {
            return await this.tagService.updateTag(updateTagDto);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * TODO
     * ? Endpoint para crear un nuevo tag.
     * @param createTagDto - DTO que contiene los datos de creación del tag.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    @Post('createTag')
    async createTag(@Body() createTagDto: CreateTagDto): Promise<{ message: string }> {
        try {
            return await this.tagService.createTag(createTagDto);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
