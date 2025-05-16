import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum userRole {
  USER = "user",
  ADMIN = "admin"
}


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 150,
  })
  name: string;

  @Column("varchar", {
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column("enum", {
    enum: userRole,
    default: userRole.USER,
  })
  user: userRole;

  @Column("boolean", {
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

}

