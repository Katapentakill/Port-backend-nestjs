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
  Job: string;

  @Column({ type: 'text' }) 
  Curriculum: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column()
  roleId: number;
}

