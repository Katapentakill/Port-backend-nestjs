import { User } from 'src/entities/user';
import { UserDto } from '../../dto/user.dto';

export class UserMapper {
    static toUserDto(user: User): UserDto {
        const { id, email, image, roleId } = user;
        return { id, email, image, role_id: roleId };
    }
}
