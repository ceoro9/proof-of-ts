import { Module }                     from '@nestjs/common';
import { ResourcePermissionsService } from './app.controller';
import { AppService }                 from './app.service';

@Module({
  imports: [],
  controllers: [ResourcePermissionsService],
  providers: [AppService],
})
export class AppModule {}
