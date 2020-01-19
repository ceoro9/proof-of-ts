import * as I                     from 'io-ts';
import * as E                     from 'fp-ts/lib/Either';
import { pipe }                   from 'fp-ts/lib/pipeable';
import { plainToClass }           from 'class-transformer';
import { validateSync }           from 'class-validator';
import { LocalAccount }           from '../models';
import { CreateLocalAccountDTO }  from '../dtos';
import { ResponseCodecInputType } from './base';

/**
 * Codec to handle creation of local account dto
 */
export const createLocalAccountRequestCodec = new I.Type<
		InstanceType<typeof CreateLocalAccountDTO>,
		InstanceType<typeof CreateLocalAccountDTO>,
		object
	>(
		'createLocalAccountRequest',	
		(input): input is InstanceType<typeof CreateLocalAccountDTO> => input instanceof CreateLocalAccountDTO,
		(input, context) => {
			const result = plainToClass(CreateLocalAccountDTO, input);
			const errors = validateSync(result);
			return (
				errors.length
				? E.left(errors.map(({ value }) => ({ context, value })))
				: E.right(result)
			);
		},
		I.identity
);

/**
 * Saves create account model instance to
 * database and returns new instance.
 * @param modelInstance 
 */
export function saveCreateAccountModel(modelInstance: InstanceType<typeof LocalAccount>) {
	return E.right(modelInstance);
}

/**
 * Codec to handle saving of local account to database
 */
export const createLocalAccountModelCodec = new I.Type<
		InstanceType<typeof LocalAccount>,
		InstanceType<typeof LocalAccount>,
		InstanceType<typeof CreateLocalAccountDTO>
	>(
		'createLocalAccountModel',
		(input): input is InstanceType<typeof LocalAccount> => input instanceof LocalAccount,
		(createLocalAccountDto) => {
			const localAccount = new LocalAccount();
			Object.assign(localAccount, createLocalAccountDto);
			return saveCreateAccountModel(localAccount);
		},
		I.identity
);


/**
 * Request DTO + created model instance
 */
export type CreateLocalAccountResponseCodecInputType = (
	ResponseCodecInputType<
		E.Either<any, CreateLocalAccountDTO>, 
		InstanceType<typeof LocalAccount>
	>
);

/**
 * Response type of created local account model method
 */
export type CreateLocalAccountResponseType = {
	firstName: string,
	lastName:  string,
};

// TODO: write type-safe version of Api Response type
class ApiResponse {

	public constructor(
		private readonly result: any,
		private readonly errors: any, 
		private readonly metadata: any
	) {}
	
	public toJson() {
		return {
			result:    this.result,
			errors:    this.errors,
			_metadata: this.metadata
		};
	}
}

/**
 * Creates success Api Response
 * @param result 
 * @param metadata 
 */
function newSuccessApiResponse(result: any, metadata?: any) {
	return new ApiResponse(result, null, metadata);
}

/**
 * Creates failure Api Response
 * @param errors 
 * @param metadata 
 */
function newFailureApiResponse(errors: any, metadata?: any) {
	return new ApiResponse(null, errors, metadata);
}

/**
 * Handles request to create local account
 */
export function handleCreateLocalAccountRequest(requestData: object) {
	return pipe(
		requestData,
		createLocalAccountRequestCodec.decode,
		E.chain(createLocalAccountModelCodec.decode),
		E.fold(newFailureApiResponse, newSuccessApiResponse)
	);
}
