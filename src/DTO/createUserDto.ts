export class CreateUserDto {
    email: string;
    name: string;
    lastname: string;
    job: string;
    curriculum: string;
    curriculumNormalized?: string;
    skills: string;
    skillsNormalized?: string;
    expertise: string;
    expertiseNormalized?: string;
    password: string;
    image?: string;
    roleId: number;
  }
  