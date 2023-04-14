import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create new user instance
   * @param createUserDto Information to create new user
   * @returns Newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  /**
   * Find all unit instances
   * @returns All user instances
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Find single unit instance
   * @param id Id of unit instance
   * @returns Unit instance
   */
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });

      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Find Single member instance using their email
   * @param email Email of member instance
   * @returns Member Instance
   */
  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({ email });

      return user;
    } catch (error) {
      throw new NotFoundException('email not found');
    }
  }

  /**
   * Update user instance
   * @param id Id of user instance to update
   * @param updateUserDto Updated user information
   * @returns Newly updated user instance
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.findOneByOrFail({ id });

      await this.userRepository.update(id, {
        ...updateUserDto,
      });

      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
