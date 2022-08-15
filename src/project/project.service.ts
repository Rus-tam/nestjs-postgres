import {
  Body,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectErrors } from 'src/errors/project.errors';
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
    // Проверяем нет ли повторяющегося проекта
    const projects = await this.projectRepository.find();
    const newProject = this.projectRepository.create({
      projectName: project.projectName.toLowerCase(),
      projectDescription: project.projectDescription.toLowerCase(),
      createdAt: new Date(),
      calculationFiles: [],
      simpleReport: [],
    });
    projects.forEach((project) => {
      if (project.projectName === newProject.projectName) {
        Logger.error('There is project with such name in database');
        throw new ConflictException(ProjectErrors.DuplicateProjectName);
      }
    });
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async getAllProjects() {
    const projects = await this.projectRepository.find({
      relations: ['calculationFiles'],
    });

    if (projects.length > 0) {
      return projects;
    } else {
      Logger.error('There is no one project in database');
      throw new NotFoundException(ProjectErrors.NotFound);
    }
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOne({
      relations: ['calculationFiles'],
      where: {
        id,
      },
    });
    if (project) {
      return project;
    } else {
      Logger.error(`Could not find project with id - ${id}`);
      throw new NotFoundException(ProjectErrors.NotFoundById);
    }
  }

  async getProjectByName(projectName: string) {
    const project = await this.projectRepository.findBy({ projectName });
    if (project.length === 0) {
      Logger.error(`Could not find project with name - ${projectName}`);
      throw new NotFoundException(ProjectErrors.NotFoundByName);
    }

    return project;
  }

  async deleteProject(projectId: number) {
    const project = await this.projectRepository.findBy({ id: projectId });
    if (project.length === 0) {
      Logger.error(`Could not find project with id - ${projectId}`);
      throw new NotFoundException(ProjectErrors.NotFoundById);
    }
    await this.projectRepository.softDelete({ id: projectId });
    return {
      message: `Project with id - ${projectId} successefuly deleted`,
    };
  }
}
