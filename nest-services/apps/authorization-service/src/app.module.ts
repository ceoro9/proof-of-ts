import { Module }                     from '@nestjs/common';
import { ResourcePolicyModule }       from '@authorization-service/resource-policy';
import { ResourcePermissionsService } from './app.controller';
import { AppService }                 from './app.service';


@Module({
  imports:     [ResourcePolicyModule],
  controllers: [ResourcePermissionsService],
  providers:   [AppService],
})
export class AppModule {}
