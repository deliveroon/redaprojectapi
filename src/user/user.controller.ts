import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('exist/phonenumber/:phonenumber')
  async existPhone(@Param('phonenumber') phoneNumber: string) {
    const user = this.userService.existPhone(phoneNumber);
    return user;
  }

  @Get('exist/username/:username')
  async exist(@Param('username') username: string) {
    const user = this.userService.exist(username);
    return user;
  }

  @Post('sendsms')
  async preInscription(@Body() body: User) {
    const user = this.userService.preInscription(body);
    return user;
  }

  @Put('confirm')
  validationInscription(@Body() body: User) {
    const user = this.userService.validationInscription(body);
    return user;
  }
}
