import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToMany,
  Unique,
  ManyToOne,
} from 'typeorm';
import { ProfileAnswer } from './profileAnswer';

@Entity()
@Unique(['firstAnswer', 'secondAnswer'])
export class MatchingCoeff {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileAnswer)
  @JoinColumn()
  firstAnswer: ProfileAnswer;

  @ManyToOne(() => ProfileAnswer)
  @JoinColumn()
  secondAnswer: ProfileAnswer;

  @Column()
  coefficient: number;
}
