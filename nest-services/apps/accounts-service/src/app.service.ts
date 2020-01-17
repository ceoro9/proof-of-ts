import { Injectable }       from '@nestjs/common';
import { AccountsService }  from '@app/accounts';
import { CreateAccountDTO } from './dtos/create.account.dto';

@Injectable()
export class AppService {
	
	public constructor(private accountsService: AccountsService) {}

	public async createAccount(createAccountDTO: CreateAccountDTO) {
		return this.accountsService.createAccount(createAccountDTO.data);
	}
}
