import { Injectable } from '@nestjs/common';
import { BlackList } from 'src/entity/blacklist.entity';
import { User } from 'src/entity/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class BlacklistService {
  async setBlack(username: string, friend: string) {
    try {
      const userRepository = getRepository(User);
      const blackRepository = getRepository(BlackList);

      const user = await userRepository.findOne({
        where: {
          username: username,
        },
      });

      const friend_user = await userRepository.findOne({
        where: {
          username: friend,
        },
      });

      await blackRepository.delete({
        user: user,
        friend: friend_user,
      });

      const blackListItem = new BlackList();
      blackListItem.user = user;
      blackListItem.friend = friend_user;
      return await blackRepository.save(blackListItem);
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
        localisation: 'SET_BLACK_ERROR',
      };
    }
  }
}
