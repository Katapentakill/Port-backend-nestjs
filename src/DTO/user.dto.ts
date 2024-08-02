export class UserDto {
  id: number;
  email: string;
  name: string;
  lastname: string;
  job: string;
  curriculum: string;
  skills?: string;
  expertise?: string;
  image?: string;
  role_id: number; 
}
