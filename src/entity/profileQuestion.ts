import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuestionType } from './questionType';

@Entity()
@Unique(['name'])
export class ProfileQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  optional: boolean;

  @ManyToOne(() => QuestionType)
  @JoinColumn()
  type: QuestionType;
}
