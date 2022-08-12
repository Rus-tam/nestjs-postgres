import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class CalculationFile {
  @PrimaryGeneratedColumn()
  id: number;

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
