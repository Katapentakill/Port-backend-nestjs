import { User } from 'src/entities/user';
import { UserDto } from '../../dto/user.dto';

export class UserMapper {
    static toUserDto(user: User): UserDto {
        const { id, email, name, lastname, job, curriculum, skills, expertise, image, roleId } = user;
        return { id, email, name, lastname, job, curriculum, skills, expertise, image, role_id: roleId };
    }
}