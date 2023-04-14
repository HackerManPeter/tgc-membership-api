import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { BranchService } from 'src/branch/branch.service';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberSeeder implements Seeder {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly branchService: BranchService,
  ) {}
  async seed() {
    const seededMembers = DataFactory.createForClass(Member).generate(10);
    const members = this.memberRepository.create(seededMembers);
    const savedMembers = await this.memberRepository.save(members);
    const memberIds = savedMembers.map((v) => v.id);
    await this.branchService.assignMember(1, { newMembers: memberIds });
  }

  async drop() {
    await this.memberRepository.delete({});
  }
}
