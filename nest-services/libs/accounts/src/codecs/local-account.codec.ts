import * as t                    from 'io-ts';
import { plainToClass }          from 'class-transformer';
import { validateSync }          from 'class-validator';
import { LocalAccount }          from '../models';
import { CreateLocalAccountDTO } from '../dtos';

/**
 * Codec to create local account
 * 
 * It's a wrapper around DTO type to create local account.
 * This codec allows to decode and validate arbitary object.
 * And encode DTO type to local account model, which allows
 * to save data to database. 
 */
export const createLocalAccountCodec = new t.Type<
		CreateLocalAccountDTO,
		InstanceType<typeof LocalAccount>,
		object
	>(
		'createLocalAccount',	
		(input): input is CreateLocalAccountDTO => input instanceof CreateLocalAccountDTO,
		(input, context) => {
			const result = plainToClass(CreateLocalAccountDTO, input);
			const errors = validateSync(result); // TODO: handle wuth TaskEither type-class
			return errors.length ? t.failure(input, context) : t.success(input);
		},
		(createLocalAccountDto) => {
			const localAccount = new LocalAccount();
			Object.assign(localAccount, createLocalAccountDto);
			return localAccount;
		}
)
