import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
@Unique(['username'])
@Unique(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => Genre)
  @JoinColumn()
  genre: Genre;

  @ManyToMany(() => Genre)
  @JoinTable()
  genreSearch: Genre;

  @Column({ nullable: true })
  taille: number;

  @Column({ nullable: true })
  tailleSearchMin: number;

  @Column({ nullable: true })
  tailleSearchMax: number;

  @Column({ length: 6 })
  smsCode: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
