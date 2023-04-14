import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Branch } from 'src/branch/entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchSeeder implements Seeder {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}
  async seed() {
    const seededBranches = DataFactory.createForClass(Branch).generate(1);
    const branches = this.branchRepository.create(seededBranches);
    await this.branchRepository.save(branches);
  }

  async drop() {
    await this.branchRepository.delete({});
  }
}
