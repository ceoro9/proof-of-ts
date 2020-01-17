import { Type }                                              from 'class-transformer';
import { BaseDTO }                                           from '@post-service/base';
import { EntitledEntityType, Resource, Asset, BaseProperty } from '../models';
import { UsernamePasswordCredentialsDtoSupport }             from '../accounts.model-support';
import {
	IsString,
	IsOptional,
	IsDateString,
	ValidateNested,
	IsDefined,
} from 'class-validator';


export class EntitledEntityDTO extends BaseDTO {

	@ValidateNested()
	@IsDefined()
	@Type(() => BaseProperty, {
		discriminator:  {
			property: '__type',
			subTypes: [
				{
					name:  EntitledEntityType.Asset,
					value: Asset
				},
				{
					name:  EntitledEntityType.Resource,
					value: Resource
				}
			]
		}
	})
	data!: Resource | Asset;
}

export class _CreateLocalAccountDTO extends BaseDTO {

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsDateString()
	@Type(() => Date)
	expiresAt!: Date;

	@ValidateNested()
	@IsDefined()
	@Type(() => EntitledEntityDTO)
	entitledEntity!: EntitledEntityDTO; 
}

export const CreateLocalAccountDTO = UsernamePasswordCredentialsDtoSupport(_CreateLocalAccountDTO);

interface Callable<R> {
  (...args: any[]): R;
}

type GenericReturnType<R, X> = X extends Callable<R> ? R : never;

export type CreateLocalAccountDTO = _CreateLocalAccountDTO & GenericReturnType<_CreateLocalAccountDTO, typeof UsernamePasswordCredentialsDtoSupport>;
