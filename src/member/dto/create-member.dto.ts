import {
  IsEmail,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsNumberString()
  branchId: number;
}
