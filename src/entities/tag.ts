import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Task } from './task';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;
  
  @ManyToMany(() => Task, task => task.tags)
  tasks: Task[];
}
