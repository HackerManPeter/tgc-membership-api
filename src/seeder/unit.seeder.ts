import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Unit } from 'src/unit/entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitSeeder implements Seeder {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}
  async seed() {
    const seededUnits = DataFactory.createForClass(Unit).generate(1);
    const units = this.unitRepository.create(seededUnits);
    await this.unitRepository.save(units);
  }

  async drop() {
    await this.unitRepository.delete({});
  }
}
