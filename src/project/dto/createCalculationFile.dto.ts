import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalculationFileDto {
  @IsString()
  fileName: string;

  @IsString()
  author: string;

  @IsString()
  description: string;
}
