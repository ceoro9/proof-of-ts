import { Module }       from '@nestjs/common';
import { ConfigModule } from '../libs/config/src';
import { UserService }  from './users.service';


@Module({
	imports:   [ConfigModule.register()],
	providers: [UserService],
	exports:   [UserService],
})
export class UsersModule {}