import { Factory } from 'nestjs-seeder';
import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory('30b Opebi Road, Ikeja')
  @Column()
  address: string;

  @Factory('Lagos')
  @Column()
  state: string;

  @Factory('Nigeria')
  @Column()
  country: string;

  @OneToMany(() => Member, (member) => member.branch)
  members: Member[];
}
