import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FriendlistService } from './friendlist.service';

@Controller('friendlist')
export class FriendlistController {
  constructor(private friendListService: FriendlistService) {}
  @UseGuards(JwtAuthGuard)
  @Get('get/:user')
  getFriend(@Param('user') user: string) {
    return this.friendListService.getFriends(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('add/:user/:friend')
  setFriend(@Param('user') user: string, @Param('friend') friend: string) {
    this.friendListService.setFriend(user, friend);
  }
}
