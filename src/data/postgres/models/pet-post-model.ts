import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User.model";

// ✅ Enum definido correctamente y exportado
export enum PetPostStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 60, nullable: false })
  petName: string;

  @Column("text", { nullable: false })
  description: string;

  @Column("varchar", { length: 255, nullable: false })
  image_url: string;

  @Column("enum", {
    enum: PetPostStatus,
    default: PetPostStatus.PENDING,
  })
  status: PetPostStatus;

  @Column("boolean", { nullable: false, default: false })
  hasFound: boolean;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.petPosts)
  @JoinColumn({ name: "userId" }) // 👈 nombre claro en la columna
  user: User;
}
