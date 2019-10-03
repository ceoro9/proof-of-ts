import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongooseService } from './mongoose.service';

@Module({
	imports:   [ConfigModule.register()],
	providers: [MongooseService],
	exports:   [MongooseService],
})
export class MongooseModule {}
