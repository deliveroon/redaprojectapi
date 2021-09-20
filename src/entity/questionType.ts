import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class QuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
