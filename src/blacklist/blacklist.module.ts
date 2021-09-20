import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';

@Module({
  providers: [BlacklistService],
  controllers: [BlacklistController]
})
export class BlacklistModule {}
