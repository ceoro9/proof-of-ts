import { Module }          from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LocalAccount }    from './models';
import {
	AccountsService,
	LocalAccountsService,
} from './services';

@Module({
	imports: [
		TypegooseModule.forFeature([
			LocalAccount
		])
	],
  providers: [
		AccountsService,
		LocalAccountsService,
	],
  exports: [
		AccountsService
	]
})
export class AccountsModule {}
