import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MatchingService } from './matching.service';

@Controller('matching')
export class MatchingController {
  constructor(private matchingService: MatchingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:username')
  async matchUsers(@Param('username') username: string) {
    return this.matchingService.matchUsers(username);
  }
}
