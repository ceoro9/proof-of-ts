import { IsEnum, IsObject } from 'class-validator';
import { AccountTypes }     from '@app/accounts';
import { BaseDTO }          from '@post-service/base';

export class CreateAccountDTO extends BaseDTO {

	@IsEnum(AccountTypes)
	type!: AccountTypes;

	@IsObject()
	data!: object;
}
