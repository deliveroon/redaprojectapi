import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('questions')
  async getQuestions() {
    return this.profileService.getQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:username')
  async getProfile(@Param('username') username: string) {
    return this.profileService.getProfile(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/:username')
  async setProfile(@Param('username') username: string, @Body() body: any) {
    return this.profileService.setProfile(username, body);
  }
}
