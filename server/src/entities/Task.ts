import {
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { TaskColumn } from "./TaskColumn";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  text!: string;

  @Column()
  index!: number;

  @CreateDateColumn()
  createdAt!: string;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.tasks)
  taskColumn: TaskColumn;
}
