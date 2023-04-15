import { Factory } from 'nestjs-seeder';
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
import { Gender } from '../member.enum';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory((faker, ctx) => faker.name.firstName(ctx.gender))
  @Column()
  firstName: string;

  @Factory((faker) => faker.name.lastName())
  @Column()
  lastName: string;

  @Factory((faker) => faker.helpers.arrayElement([Gender.male, Gender.female]))
  @Column({ enum: Gender })
  gender: Gender;

  @Factory((faker, ctx) =>
    faker.helpers.unique(faker.internet.email, [ctx.firstName, ctx.lastName]),
  )
  @Column({ unique: true })
  email: string;

  @Factory((faker) => faker.phone.number('+2348#########'))
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
