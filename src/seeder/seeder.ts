import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { User } from 'src/user/entities/user.entity';
import { UserSeeder } from './user.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config';
import { Member } from 'src/member/entities/member.entity';
import { MemberSeeder } from './member.seeder';
import { BranchSeeder } from './branch.seeder';
import { UnitSeeder } from './unit.seeder';
import { Unit } from 'src/unit/entities/unit.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { BranchModule } from 'src/branch/branch.module';

seeder({
  imports: [
    BranchModule,
    ConfigModule.forRoot({ load: config, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Member, Unit, Branch]),
  ],
}).run([UserSeeder, BranchSeeder, MemberSeeder, UnitSeeder]);
