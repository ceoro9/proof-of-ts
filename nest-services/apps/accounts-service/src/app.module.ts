import { Module }          from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import * as ConfigLib      from '@post-service/config';
import { AccountsModule }  from '@app/accounts/accounts.module';
import { AppController }   from './app.controller';
import { AppService }      from './app.service';

@Module({
  imports: [
		TypegooseModule.forRootAsync({
			imports: [ConfigLib.ConfigModule.register()],
			useFactory: async (configService: ConfigLib.ConfigService) => ({
				uri: configService.getStrict('ACCOUNTS_MONGODB_URI'),
				useNewUrlParser: true
			}),
			inject: [ConfigLib.ConfigService]
		}),
		AccountsModule,
	],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
