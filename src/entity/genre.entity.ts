import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
