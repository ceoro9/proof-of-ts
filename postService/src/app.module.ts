import { Module }         from '@nestjs/common';
import { AppController }  from './app.controller';
import { AppService }     from './app.service';
import { ConfigModule }   from './config/config.module';
import { PostsModule }    from './posts/posts.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { PostTagsModule } from './post-tags/post-tags.module';
import { UsersModule }    from './users/users.module';
import { LoggerModule }   from './logger/logger.module';

@Module({
  imports: [
		ConfigModule,
		MongooseModule,
		PostsModule,
		LoggerModule,
		UsersModule,
		PostTagsModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}