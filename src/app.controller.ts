import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './project/dto/createProject.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/new-project')
  async makeNewProject(@Body() project: CreateProjectDto) {
    console.log(project);
    await this.appService.makeNewProject(project);
  }
}
