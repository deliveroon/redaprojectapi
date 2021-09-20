import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProfileAnswer } from './profileAnswer';
import { ProfileQuestion } from './profileQuestion';
import { User } from './user.entity';

@Entity()
@Unique(['user', 'answer'])
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => ProfileQuestion)
  @JoinColumn()
  question: ProfileQuestion;

  @ManyToOne(() => ProfileAnswer)
  @JoinColumn()
  answer: ProfileAnswer;
}
