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

  /**
   * Create new member instance
   * @param createMemberDto Information to create new member
   * @returns Newly created member instance
   */
  create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(member);
  }

  /**
   * Find all member instances
   * @returns All member instances
   */
  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  /**
   * Find single member instance
   * @param id Id of member instance
   * @returns Member instance
   */
  async findOne(id: number): Promise<Member> {
    try {
      const member = await this.memberRepository.findOneByOrFail({ id });

      return member;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   *
   * @param id Id of member instance to update
   * @param updateMemberDto Updated member information
   * @returns Newly updated member instance
   */
  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    try {
      await this.memberRepository.findOneByOrFail({ id });
      await this.memberRepository.update(id, { ...updateMemberDto });
      return this.memberRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Deactivate member
   * @param id Id of member to be deactivated
   * @returns Newly deactivated Member
   */
  async deactivate(id: number): Promise<Member> {
    try {
      const member = await this.memberRepository.findOneByOrFail({ id });
      member.isActive = false;

      return this.memberRepository.save(member);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Validate a set of members exist
   * @param memberIds Id of all the members to be validated
   * @returns Array of validated Members
   */
  async validateMembers(memberIds: number[]): Promise<Member[]> {
    const validatedMembers: Member[] = [];

    for (const id in memberIds) {
      const validatedMember = await this.findOne(memberIds[id]);

      validatedMembers.push(validatedMember);
    }

    return validatedMembers;
  }
}
