import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
export class BlacklistController {
  constructor(private blacklistService: BlacklistService) {}
  @UseGuards(JwtAuthGuard)
  @Get('add/:user/:friend')
  setBlack(@Param('user') user: string, @Param('friend') friend: string) {
    this.blacklistService.setBlack(user, friend);
  }
}
