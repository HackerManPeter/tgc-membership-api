import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Factory } from 'nestjs-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory((faker) =>
    faker.name.firstName(faker.helpers.arrayElement(['male', 'female'])),
  )
  @Column()
  firstName: string;

  @Factory((faker) => faker.name.lastName())
  @Column()
  lastName: string;

  @Factory((faker, ctx) =>
    faker.helpers.unique(faker.internet.email, [ctx.firstName, ctx.lastName]),
  )
  @Column({ unique: true })
  email: string;

  @Factory('password')
  @Column({ default: 'password' })
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(parial: Partial<User>) {
    Object.assign(this, parial);
  }
}
