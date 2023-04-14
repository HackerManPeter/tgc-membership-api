import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { MemberService } from 'src/member/member.service';
import { AssignMembersDTO } from 'src/branch/dto/assign-members.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
    private readonly memberService: MemberService,
  ) {}

  /**
   * Create new unit instance
   * @param createUnitDto Information to create a new unit
   * @returns Newly created unit instance
   */
  create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const newUnit = this.unitRepository.create(createUnitDto);

    return this.unitRepository.save(newUnit);
  }

  /**
   * Find all unit instances
   * @returns All newly created unit instances
   */
  findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  /**
   * Find single unit instance
   * @param id Id of unit instance
   * @returns Unit instance
   */
  async findOne(id: number): Promise<Unit> {
    try {
      const unit = await this.unitRepository.findOneByOrFail({ id });

      return unit;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Add members to a unit
   * @param id Id of the unit
   * @param assignMemberDto array containing new members
   * @returns unit
   */
  async assignMember(
    id: number,
    assignMemberDto: AssignMembersDTO,
  ): Promise<Unit> {
    try {
      const unit = await this.unitRepository.findOneByOrFail({ id });

      const { newMembers } = assignMemberDto;
      const validatedMembers = await this.memberService.validateMembers(
        newMembers,
      );

      unit.members = validatedMembers;

      return await this.unitRepository.save(unit);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Update unit instance
   * @param id Id of unit instance to update
   * @param updateUnitDto Updated unit information
   * @returns Newly updated unit instance
   */
  async update(id: number, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    try {
      await this.unitRepository.findOneByOrFail({ id });
      await this.unitRepository.update(id, { ...updateUnitDto });
      return this.unitRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
