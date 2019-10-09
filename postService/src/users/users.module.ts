import { Module }       from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { UserService }  from './users.service';

@Module({
	imports:   [ConfigModule],
	providers: [UserService],
	exports:   [UserService],
})
export class UsersModule {}
