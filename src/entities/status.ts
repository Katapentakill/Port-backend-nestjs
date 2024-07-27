import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Task, task => task.status)
  tasks: Task[];
}
