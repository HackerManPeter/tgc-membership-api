import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  countryCode: string;

  @OneToMany(() => Member, (member) => member.branch)
  members: Member[];
}
