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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly projectService: ProjectService,
    private readonly calculationFileService: CalculationFileService,
  ) {}

  @Post('/new-project')
  async makeNewProject(@Body() project: CreateProjectDto) {
    await this.appService.makeNewProject(project);
  }

  @Get('/all-projects')
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();

    return projects;
  }

  @Get('/projects/:id')
  async getProjectById(@Param('id') id: number) {
    const project = await this.projectService.getProjectById(id);

    return project;
  }

  @Get('/projects/find-by-name/:name')
  async getProjectByName(@Param('name') name: string) {
    const project = await this.projectService.getProjectByName(name);
    return project;
  }

  @Delete('/projects/:id')
  async deleteProject(@Param('id') id: number) {
    const message = await this.projectService.deleteProject(id);

    return message;
  }

  @Post('/new-file')
  @UseInterceptors(FileInterceptor('file'))
  async createNewFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileInfo: CreateCalculationFileDto,
    projectId: number,
  ) {
    const project = await this.projectService.getProjectById(projectId)[0];

    const calculationFile =
      await this.calculationFileService.uploadCalculationFile(
        file.buffer,
        fileInfo,
        project,
      );
  }
}
