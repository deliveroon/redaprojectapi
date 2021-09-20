import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MatchingCoeff } from './matchingCoeff';
import { ProfileQuestion } from './profileQuestion';

@Entity()
@Unique(['question', 'name'])
export class ProfileAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProfileQuestion)
  @JoinColumn()
  question: ProfileQuestion;
}
