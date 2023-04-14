import { Factory } from 'nestjs-seeder';
import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory('Technical')
  @Column()
  name: string;

  @ManyToMany(() => Member, (member) => member.units)
  members: Member[];
}
