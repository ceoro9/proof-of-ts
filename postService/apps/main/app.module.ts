import { Module }         from '@nestjs/common';
import { AppController }  from './app.controller';
import { AppService }     from './app.service';
import { ConfigModule }   from './libs/config/src/config.module';
import { PostsModule }    from './posts/posts.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { PostTagsModule } from './post-tags/post-tags.module';
import { BaseModule }     from './base/base.module';
import { UsersModule }    from './users/users.module';
import { LoggerModule }   from './mongoose/logger.module';

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
