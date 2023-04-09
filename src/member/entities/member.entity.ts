import { Branch } from 'src/branch/entities/branch.entity';
import { convertToTitleCase } from 'src/utils/strings';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  fullName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: new Date() })
  dateInducted: Date;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Branch, (branch) => branch.members)
  branch: Branch;

  @BeforeInsert()
  updateFullName() {
    this.fullName = `${convertToTitleCase(this.firstName)} ${convertToTitleCase(
      this.lastName,
    )}`;
  }
}
