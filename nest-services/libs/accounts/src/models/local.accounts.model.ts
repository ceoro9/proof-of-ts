import { prop, DocumentType }        from '@typegoose/typegoose';
import { BaseAccount } from './base.account.model';
import {
	UsernamePasswordCredentialsModelSupport
} from '../accounts.model-support';
import { IsString } from 'class-validator';

export enum EntitledEntityType {
	Resource = 'resource',
	Asset    = 'asset'
}

export class BaseProperty {}

export class Resource extends BaseProperty {

	@prop({ required: true })
	@IsString()
	resourceName!: string;

	@prop({ required: true })
	@IsString()
	resourceId!: string;
}

export function isResource(obj: any): obj is Resource {
	return obj instanceof Resource;
}

export class Asset extends BaseProperty {

	@prop({ required: true })
	@IsString()
	assetId!: string;

	// TODO
}

export function isAsset(obj: any): obj is Asset {
	return obj instanceof Asset;
}

/**
 * LocalAccount
 * Local to some resource or asset
 */
export class _LocalAccount extends BaseAccount {

	// TODO: ADD STATUS

	@prop({ required: true, enum: EntitledEntityType })
  entitledEntityType!: string;

	@prop({ required: true, refPath: 'entitledEntityType' })
	entitledEntity!: Resource | Asset;
}

export const LocalAccount = UsernamePasswordCredentialsModelSupport(_LocalAccount);

// export type LocalAccount = typeof LocalAccount;

export type LocalAccountType = DocumentType<ReturnType<typeof UsernamePasswordCredentialsModelSupport> & _LocalAccount>;
