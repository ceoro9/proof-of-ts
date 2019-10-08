import { Module }          from '@nestjs/common';
import { ConfigModule }    from '../config/config.module';
import { MongooseService } from './mongoose.service';
import { LoggerModule }    from '../logger/logger.module';

@Module({
	imports: [
		ConfigModule.register(),
		LoggerModule,
	],
	providers: [MongooseService],
	exports:   [MongooseService],
})
export class MongooseModule {}
