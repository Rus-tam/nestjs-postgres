import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class SimpleReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project: Project) => project.simpleReport)
  project: Project;

  @Column({ type: 'bytea' })
  simpleReport: Uint8Array;

  @Column()
  creationTime: string;

  @Column()
  description: string;
}
