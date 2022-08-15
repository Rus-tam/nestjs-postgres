import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculationFileErrors } from 'src/errors/calculationFile.error';
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
    file: Express.Multer.File,
    fileInfo: CreateCalculationFileDto,
    project: Project,
  ): Promise<CalculationFile> {
    const obj = JSON.parse(JSON.stringify(fileInfo));
    const fileData = {
      fileName: file.originalname,
      author: obj.fileInfo.author,
      createdAt: new Date(),
      description: obj.fileInfo.description,
    };
    const newFile = this.calculationFileRepository.create({
      ...fileData,
      file: file.buffer,
      project,
    });

    await this.calculationFileRepository.save(newFile);

    return newFile;
  }

  async deleteCalculationFileById(id: number): Promise<void> {
    const calculationFile = await this.calculationFileRepository.findBy({ id });

    if (calculationFile.length === 0) {
      Logger.error(`Could not find project with id - ${id}`);
      throw new NotFoundException(CalculationFileErrors.NotFoundById);
    }

    const deleteResponse = await this.calculationFileRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(CalculationFileErrors.NotFoundById);
    }
  }
}
