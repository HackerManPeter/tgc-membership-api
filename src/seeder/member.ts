import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberSeeder implements Seeder {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  async seed() {
    const seededMembers = DataFactory.createForClass(Member).generate(10);

    const members = this.memberRepository.create(seededMembers);

    console.log(members);
  }

  async drop() {
    //
  }
}
