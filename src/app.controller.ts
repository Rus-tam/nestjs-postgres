import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ProjectErrors } from './errors/project.errors';
import { CalculationFileService } from './project/calculationFile.service';
import { CreateProjectDto } from './project/dto/createProject.dto';
import { ProjectService } from './project/project.service';
import { Express } from 'express';
import { CreateCalculationFileDto } from './project/dto/createCalculationFile.dto';
import { CalculationFile } from './project/calculationFile.entitty';
import { Project } from './project/project.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly projectService: ProjectService,
    private readonly calculationFileService: CalculationFileService,
  ) {}

  @Post('/new-project')
  async makeNewProject(@Body() project: CreateProjectDto): Promise<void> {
    await this.appService.makeNewProject(project);
  }

  @Get('/all-projects')
  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectService.getAllProjects();

    return projects;
  }

  @Get('/projects/:id')
  async getProjectById(@Param('id') id: number): Promise<Project> {
    const project = await this.projectService.getProjectById(id);

    return project;
  }

  @Get('/projects/find-by-name/:name')
  async getProjectByName(@Param('name') name: string): Promise<Project> {
    const project = await this.projectService.getProjectByName(name);
    return project[0];
  }

  @Delete('/projects/delete/:id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    const project = await this.projectService.getProjectById(id);
    const calculationFiles = project.calculationFiles;

    for (const file of calculationFiles) {
      await this.calculationFileService.deleteCalculationFileById(file.id);
    }

    await this.projectService.deleteProject(id);
  }

  @Post('/projects/:id/new-calculation-file')
  @UseInterceptors(FileInterceptor('file'))
  async createNewFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() fileInfo: CreateCalculationFileDto,
  ): Promise<CalculationFile> {
    const project = await this.projectService.getProjectById(id);

    const calculationFile =
      await this.calculationFileService.uploadCalculationFile(
        file,
        fileInfo,
        project[0],
      );

    return calculationFile;
  }

  @Delete('/projects/delete-calculation-file/:id')
  async deleteCalculationFile(@Param('id') id: number): Promise<void> {
    await this.calculationFileService.deleteCalculationFileById(id);
  }
}
