import { Module } from '@nestjs/common';
import { ResourcePolicyService } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ResourcePolicyService],
  providers: [AppService],
})
export class AppModule {}
