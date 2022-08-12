import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectErrors } from './errors/project.errors';
import { CreateProjectDto } from './project/dto/createProject.dto';
import { ProjectService } from './project/project.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly projectService: ProjectService,
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
}
