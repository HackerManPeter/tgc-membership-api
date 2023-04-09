import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  create(createMemberDto: CreateMemberDto) {
    const member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(member);
  }

  findAll() {
    return this.memberRepository.find();
  }

  findOne(id: number) {
    try {
      const member = this.memberRepository.findOneByOrFail({ id });

      return member;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    try {
      await this.memberRepository.findOneByOrFail({ id });
      await this.memberRepository.update(id, { ...updateMemberDto });
      return this.memberRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deactivate(id: number) {
    try {
      const member = await this.memberRepository.findOneByOrFail({ id });
      member.isActive = false;

      return this.memberRepository.save(member);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
