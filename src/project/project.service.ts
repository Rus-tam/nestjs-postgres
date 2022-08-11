import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalculationFile } from './calculationFile.entitty';
import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './project.entity';
import { SimpleReport } from './simpleReport.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(project: CreateProjectDto) {
    const newProject = await this.projectRepository.create(project);
    await this.projectRepository.save(newProject);
    return newProject;
  }
}
