import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: false })
  name: string;

  @Column({ unique: false })
  lastname: string;

  @Column({ type: 'varchar', length: 255 }) 
  job: string;

  @Column({ type: 'text' }) 
  curriculum: string;

  @Column({ type: 'text', nullable: true })
  curriculumNormalized: string;  // Nuevo campo para el curriculum normalizado

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column()
  roleId: number;

  @Column({ type: 'text', nullable: true }) 
  skills: string;

  @Column({ type: 'text', nullable: true }) 
  skillsNormalized: string;

  @Column({ type: 'text', nullable: true }) 
  expertise: string;

  @Column({ type: 'text', nullable: true }) 
  expertiseNormalized: string;
}
