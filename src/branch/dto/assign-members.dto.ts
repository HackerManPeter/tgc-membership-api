import { IsArray } from 'class-validator';

export class AssignMembersDTO {
  @IsArray()
  newMembers: number[];
}
