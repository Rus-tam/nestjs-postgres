import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { CalculationFile } from './calculationFile.entitty';
import { SimpleReport } from './simpleReport.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  projectDescription: string;

  @Column()
  createdAt: Date;

  @OneToMany(
    () => CalculationFile,
    (calculationFile: CalculationFile) => calculationFile.project,
  )
  calculationFiles: CalculationFile[];

  @OneToMany(
    () => SimpleReport,
    (simpleReport: SimpleReport) => simpleReport.project,
  )
  simpleReport: SimpleReport[];
}
