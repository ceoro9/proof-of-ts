import { Module }         from '@nestjs/common';

import { ConfigModule }   from '@post-service/config';
import { PostsModule }    from '@post-service/posts';
import { MongooseModule } from '@post-service/mongoose';
import { PostTagsModule } from '@post-service/post-tags';
import { BaseModule }     from '@post-service/base';
import { UsersModule }    from '@post-service/users';
import { LoggerModule }   from '@post-service/logger';

import { AppController }  from './app.controller';
import { AppService }     from './app.service';


@Module({
  imports: [
		ConfigModule,
		MongooseModule,
		PostsModule,
		LoggerModule,
		UsersModule,
		PostTagsModule,
		BaseModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
