import { Module }       from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { UserService }  from './users.service';

@Module({
	imports:   [ConfigModule.register({ USER_SERVICE_URL: 'http://localhost:8000' })],
	providers: [UserService],
	exports:   [UserService],
})
export class UsersModule {}
