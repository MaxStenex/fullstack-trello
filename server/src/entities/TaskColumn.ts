import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  OneToMany,
  Column,
} from "typeorm";

import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class TaskColumn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  index!: number;

  @CreateDateColumn()
  createdAt!: string;

  @ManyToOne(() => User, (user) => user.taskColumns)
  user: User;

  @OneToMany(() => Task, (task) => task.taskColumn)
  tasks: Task[];
}
