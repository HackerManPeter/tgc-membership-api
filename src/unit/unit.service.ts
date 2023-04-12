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

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
  ) {}
  create(createUnitDto: CreateUnitDto) {
    const newUnit = this.unitRepository.create(createUnitDto);

    return this.unitRepository.save(newUnit);
  }

  findAll() {
    return this.unitRepository.find();
  }

  async findOne(id: number) {
    try {
      const unit = await this.unitRepository.findOneByOrFail({ id });

      return unit;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    try {
      await this.unitRepository.findOneByOrFail({ id });
      await this.unitRepository.update(id, { ...updateUnitDto });
      return this.unitRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
