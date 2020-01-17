import { Injectable }                    from '@nestjs/common';
import { BaseDTO }                       from '@post-service/base';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AnyParamConstructor }           from '@typegoose/typegoose/lib/types';
import { LocalAccount }                  from '../models';
import { CreateLocalAccountDTO }         from '../dtos';
import { LocalAccountsService }          from './local-accounts.service';

type Constructable = AnyParamConstructor<any>;

/**
 * AccountInstance<typeof ModelType>
 */
export type AccountInstance<TModel extends Constructable> = DocumentType<ReturnModelType<TModel>>;

/**
 * Return type of newly created 
 */
export type CreateAccountResponse<TModel extends Constructable> = Promise<{
	accountInstance: DocumentType<ReturnModelType<TModel>>
}>;

@Injectable()
export class AccountsService {
	
	public constructor(
		private readonly localAccountsService: LocalAccountsService
	) {}

	/**
	 * Overloaded method to create different types of accounts
	 * @param data createDTO
	 */
	public async createAccount(data: CreateLocalAccountDTO): CreateAccountResponse<typeof LocalAccount>;
	public async createAccount(data: any) {
		if (data instanceof CreateLocalAccountDTO) {
			const accountInstance = await this.localAccountsService.createAccount(data);
			return { accountInstance };
		}
	}
}
