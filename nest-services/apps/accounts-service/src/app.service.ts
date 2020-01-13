import { Injectable }           from '@nestjs/common';
import { LocalAccountsService } from '@app/accounts/accounts.service';
import { CreateAccountDTO }     from './dtos/create.account.dto';
import { validate } from 'class-validator';
import { AccountTypes } from '@app/accounts';

@Injectable()
export class AppService {

	public constructor(private localAccountService: LocalAccountsService) {}

	public async createAccount(createAccountDTO: CreateAccountDTO) {

		// const errors = await createAccountDTO.validate();

		// if (errors.length) {
		// 	// TODO
		// 	throw new Error(
		// 		`Error happened: ${errors.map(err => err.toString()).join(', ')}`
		// 	);
		// }

		switch (createAccountDTO.type) {

			case AccountTypes.Local: {
				// TODO
				console.log(createAccountDTO.data, 'GOT')
				const result = await this.localAccountService.createAccount(createAccountDTO.data);
				return result;
			}

			default: {
				return null; // TODO
			}
		}
	}
}
