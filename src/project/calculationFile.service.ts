import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalculationFile } from './calculationFile.entitty';
import { CreateCalculationFileDto } from './dto/createCalculationFile.dto';
import { Project } from './project.entity';

@Injectable()
export class CalculationFileService {
  constructor(
    @InjectRepository(CalculationFile)
    private calculationFileRepository: Repository<CalculationFile>,
  ) {}

  async uploadCalculationFile(
    dataBuffer: Buffer,
    fileInfo: CreateCalculationFileDto,
    project: Project,
  ) {
    const newFile = await this.calculationFileRepository.create({
      ...fileInfo,
      file: dataBuffer,
      project,
    });

    await this.calculationFileRepository.save(newFile);

    return newFile;
  }
}
