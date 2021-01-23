import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  Column,
} from "typeorm";

import { TaskColumn } from "./TaskColumn";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt!: string;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.tasks)
  taskColumn: TaskColumn;
}
