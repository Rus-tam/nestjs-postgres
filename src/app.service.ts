import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './project/dto/createProject.dto';
import { ProjectService } from './project/project.service';

@Injectable()
export class AppService {
  constructor(private projectService: ProjectService) {}

  async makeNewProject(project: CreateProjectDto) {
    await this.projectService.createProject(project);
  }
}
