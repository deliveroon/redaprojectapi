import { Injectable } from '@nestjs/common';
import { FriendList } from 'src/entity/friendlist.entity';
import { User } from 'src/entity/user.entity';
import { getRepository } from 'typeorm';
import { getConnection } from 'typeorm';

@Injectable()
export class FriendlistService {
  async getFriends(username: string) {
    const query = `
        SELECT us2.username as friend
        FROM friend_list fl1,
        friend_list fl2,
        user us1,
        user us2
        WHERE us1.username = '${username}'
        AND us1.id = fl1.userId
        AND us2.id = fl2.userId
        AND fl1.friendId = fl2.userId
    `;

    const result = await getConnection().query(query);
    return result;
  }
  async setFriend(username: string, friend: string) {
    try {
      const userRepository = getRepository(User);
      const friendRepository = getRepository(FriendList);

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

      await friendRepository.delete({
        user: user,
        friend: friend_user,
      });

      const friendListItem = new FriendList();
      friendListItem.user = user;
      friendListItem.friend = friend_user;
      return await friendRepository.save(friendListItem);
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
        localisation: 'SET_FRIEND_ERROR',
      };
    }
  }
}
