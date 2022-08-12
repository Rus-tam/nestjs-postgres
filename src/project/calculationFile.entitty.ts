import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class CalculationFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @ManyToOne(() => Project, (project: Project) => project.calculationFile)
  project: Project;

  @Column({ type: 'bytea' })
  file: Uint8Array;

  @Column()
  author: string;

  @Column()
  uploadTime: string;

  @Column()
  description: string;
}
