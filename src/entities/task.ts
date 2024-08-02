import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from './user';
import { Tag } from './tag';
import { Status } from './status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'text', nullable: true })
  requiredSkills: string;

  @Column({ type: 'text', nullable: true })
  requiredSkillsNormalized: string;

  @Column({ type: 'text', nullable: true })
  requiredExpertise: string;

  @Column({ type: 'text', nullable: true })
  requiredExpertiseNormalized: string;

  @Column({ type: 'text', nullable: true })
  descriptionNormalized: string;

  @ManyToMany(() => Tag, tag => tag.tasks)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, user => user.id, { nullable: true })
  user: User;

  @Column({ nullable: true })
  userId?: number;

  @Column({ type: 'text' })
  creationDate: string;

  @Column({ type: 'text' })
  dueDate: string;

  @ManyToOne(() => Status, status => status.tasks, { nullable: false })
  status: Status;

  @Column()
  statusId: number;
}
