import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMapper } from 'src/common/map/user.map';
import { UserDto } from 'src/DTO/user.dto';
import { User } from 'src/entities/user';
import { normalizeText } from '../utils/normalizeText';
import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async allUsers(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.find();
      return users.map(UserMapper.toUserDto);
    } catch (error) {
      throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
        console.log('Creating user with DTO:', createUserDto);

        createUserDto.curriculumNormalized = normalizeText(createUserDto.curriculum);
        createUserDto.skillsNormalized = normalizeText(createUserDto.skills);
        createUserDto.expertiseNormalized = normalizeText(createUserDto.expertise);

        console.log('Normalized DTO:', createUserDto);

        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);

        return UserMapper.toUserDto(user);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

  async update(sid: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      updateUserDto.curriculumNormalized = normalizeText(updateUserDto.curriculum);
      updateUserDto.skillsNormalized = normalizeText(updateUserDto.skills);
      updateUserDto.expertiseNormalized = normalizeText(updateUserDto.expertise);
      await this.userRepository.update(sid, updateUserDto);
      const updatedUser = await this.userRepository.findOne({where: {id: sid}});
      return UserMapper.toUserDto(updatedUser);
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
