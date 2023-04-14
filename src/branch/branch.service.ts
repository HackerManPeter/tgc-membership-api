import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { AssignMembersDTO } from './dto/assign-members.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    private readonly memberService: MemberService,
  ) {}

  /**
   * Create a new branch instance
   * @param createBranchDto Information to create new branch
   * @returns Newly created branch instance
   */
  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    try {
      const branch = this.branchRepository.create(createBranchDto);

      return await this.branchRepository.save(branch);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Find all branches
   * @returns All branch instances
   */
  findAll(): Promise<Branch[]> {
    return this.branchRepository.find();
  }

  async findOne(id: number) {
    try {
      const branch = await this.branchRepository.findOneByOrFail({ id });

      return branch;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Add members to a branch
   * @param id Id of the branch
   * @param assignMemberDto array containing new members
   * @returns branch
   */
  async assignMember(
    id: number,
    assignMemberDto: AssignMembersDTO,
  ): Promise<Branch> {
    try {
      const branch = await this.branchRepository.findOneByOrFail({ id });

      const { newMembers } = assignMemberDto;
      const validatedMembers = await this.memberService.validateMembers(
        newMembers,
      );

      branch.members = validatedMembers;

      return await this.branchRepository.save(branch);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Update branch instance
   * @param id Id of branch instance to update
   * @param updateBranchDto Updated branch information
   * @returns Newly updated branch instance
   */
  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    try {
      await this.branchRepository.findOneByOrFail({ id });

      await this.branchRepository.update(id, { ...updateBranchDto });

      return await this.branchRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
