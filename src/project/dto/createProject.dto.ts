import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsString()
  projectDescription: string;
}
