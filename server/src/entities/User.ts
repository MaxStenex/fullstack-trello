import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";

import { TaskColumn } from "./TaskColumn";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(3, {
    message: "Minimum fullname length is 3",
  })
  @MaxLength(255, {
    message: "Maximum fullname length is 255",
  })
  fullname!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(8, {
    message: "Minimum password length is 8",
  })
  @MaxLength(255, {
    message: "Maximum password length is 255",
  })
  password!: string;

  @CreateDateColumn()
  createdAt!: string;

  @Column("int", { default: 0 })
  tokenVersion!: number;

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.user)
  taskColumns: TaskColumn[];
}
