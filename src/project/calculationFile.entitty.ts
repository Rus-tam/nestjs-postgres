import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class CalculationFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @ManyToOne(() => Project, (project: Project) => project.calculationFiles)
  project: Project;

  @Column({ type: 'bytea' })
  file: Uint8Array;

  @Column()
  author: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @DeleteDateColumn()
  public deletedAt: Date;
}
