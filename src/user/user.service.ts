import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from 'src/common/map/user.map';
import { UserDto } from 'src/DTO/user.dto';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    /**
     * Fetches all users from the database and maps them to UserDto objects.
     * @returns A promise that resolves to an array of UserDto objects.
     */
    async allUsers(): Promise<UserDto[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(UserMapper.toUserDto);
        } catch (error) {
            throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetches a single user by their ID.
     * @param userId - The ID of the user to fetch.
     * @returns A promise that resolves to a UserDto object.
     */
    async oneUser(userId: number): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return UserMapper.toUserDto(user);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a user by their ID.
     * @param userId - The ID of the user to delete.
     * @returns A promise that resolves to a success message.
     */
    async deleteUser(userId: number): Promise<string> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            await this.userRepository.remove(user);
            return 'User successfully deleted';
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserImage(userId: number, imageUrl: string): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                console.warn(`User not found: ${userId}`);
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            user.image = imageUrl;
            await this.userRepository.save(user);
            return UserMapper.toUserDto(user);
        } catch (error) {
            console.error('Error updating user image', error.stack);
            throw new HttpException('Error updating user image', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
