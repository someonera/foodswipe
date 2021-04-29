import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title: string;
}
