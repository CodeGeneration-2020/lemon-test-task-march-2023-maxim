import { IsBoolean, IsString } from 'class-validator';

export class SubmitScoreDTO {
  @IsString()
  username: string;

  @IsBoolean()
  result: boolean;
}
