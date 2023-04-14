import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const users = DataFactory.createForClass(User).generate(5);
    const newUsers = this.userRepository.create(users);
    await this.userRepository.save(newUsers);

    const userPeter = {
      firstName: 'peter',
      lastName: 'ebueku',
      email: 'peter@email.com',
      password: 'peter123',
    };

    const newUserPeter = this.userRepository.create(userPeter);
    await this.userRepository.save(newUserPeter);
  }

  async drop() {
    await this.userRepository.delete({});
  }
}
