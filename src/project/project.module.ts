import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationFile } from './calculationFile.entitty';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { SimpleReport } from './simpleReport.entity';
import { CalculationFileService } from './calculationFile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, SimpleReport, CalculationFile]),
    ConfigModule,
  ],
  providers: [ProjectService, CalculationFileService],
  exports: [ProjectService, CalculationFileService],
})
export class ProjectModule {}
