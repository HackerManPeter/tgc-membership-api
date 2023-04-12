import { Branch } from 'src/branch/entities/branch.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { convertToTitleCase } from 'src/utils/strings';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => Branch, (branch) => branch.members, { eager: true })
  branch: Branch;

  @ManyToMany(() => Unit, (unit) => unit.members, { eager: true })
  @JoinTable()
  units: Unit[];

  @BeforeInsert()
  updateFullName() {
    this.fullName = `${convertToTitleCase(this.firstName)} ${convertToTitleCase(
      this.lastName,
    )}`;
  }
}
