import { IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  address: string;

  @IsString()
  state: string;
}
