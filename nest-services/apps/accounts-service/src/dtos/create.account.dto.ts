import { ValidateNested, IsNotEmpty }          from 'class-validator';
import { Type }                                from 'class-transformer';
import { BaseDTO }                             from '@post-service/base';
import { AccountTypes, CreateLocalAccountDTO } from '@app/accounts';

export class CreateAccountDTO extends BaseDTO {

	@ValidateNested()
	@IsNotEmpty()
	@Type(() => BaseDTO, {
		discriminator: {
			property: '__type',
			subTypes: [
				{
					value: CreateLocalAccountDTO,
					name:  'local'
				}
			]
		}
	})
	data!: CreateLocalAccountDTO;
}
