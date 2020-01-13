import { prop }        from '@typegoose/typegoose';
import { BaseAccount } from './base.account.model';
import {
	UsernamePasswordCredentialsModelSupport
} from '../accounts.model-support';

export enum EntitledEntityType {
	Resource = 'resource',
	Asset    = 'asset'
}

export class Resource {

	@prop({ required: true })
	resourceName!: string;

	@prop({ required: true })
	resourceId!: string;
}

export function isResource(obj: any): obj is Resource {
	return obj instanceof Resource;
}

export class Asset {

	@prop({ required: true })
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

export type LocalAccountType = ReturnType<typeof UsernamePasswordCredentialsModelSupport> & _LocalAccount;
