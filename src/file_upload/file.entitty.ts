import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;

  @Column()
  project_name: string;

  @Column()
  project_description: string;

  @Column()
  project_author: string;

  @Column({ type: 'bytea' })
  file: Uint8Array;
}
