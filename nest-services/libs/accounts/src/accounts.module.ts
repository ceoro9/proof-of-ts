import { Module }               from '@nestjs/common';
import { TypegooseModule }      from 'nestjs-typegoose';
import { LocalAccountsService } from './accounts.service';
import { LocalAccount }         from './models';

@Module({
	imports: [
		TypegooseModule.forFeature([
			LocalAccount
		])
	],
  providers: [LocalAccountsService],
  exports:   [LocalAccountsService],
})
export class AccountsModule {}
