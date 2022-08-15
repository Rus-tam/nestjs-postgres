import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalculationFileDto {
  @IsString()
  author: string;

  @IsString()
  description: string;
}
