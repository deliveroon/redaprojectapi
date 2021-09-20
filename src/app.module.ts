import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Genre } from './entity/genre.entity';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileAnswer } from './entity/profileAnswer';
import { ProfileQuestion } from './entity/profileQuestion';
import { UserProfile } from './entity/userProfile';
import { MatchingCoeff } from './entity/matchingCoeff';
import { QuestionType } from './entity/questionType';
import { ProfileModule } from './profile/profile.module';
import { MatchingModule } from './matching/matching.module';
import { FriendList } from './entity/friendlist.entity';
import { FriendlistModule } from './friendlist/friendlist.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { BlackList } from './entity/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.cyeogm7cwnns.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'test110110',
      database: 'test',
      entities: [
        Genre,
        User,
        UserProfile,
        QuestionType,
        ProfileQuestion,
        ProfileAnswer,
        MatchingCoeff,
        FriendList,
        BlackList,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    MatchingModule,
    FriendlistModule,
    BlacklistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
