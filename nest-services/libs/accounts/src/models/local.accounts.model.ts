import { prop, DocumentType }                      from '@typegoose/typegoose';
import { IsString }                                from 'class-validator';
import { BaseAccount }                             from './base.account.model';
import { UsernamePasswordCredentialsModelSupport } from '../accounts.model-support';

// TODO: move to another files
export enum EntitledEntityType {
	Resource = 'resource',
	Asset    = 'asset'
}

export class BaseProperty {}

export class Resource extends BaseProperty {

	@prop({ required: true })
	@IsString() // TODO: add custom validation
	resourceName!: string;

	@prop({ required: true })
	@IsString() // TODO: add object id validation
	resourceId!: string;
}

export function isResource(obj: any): obj is Resource {
	return obj instanceof Resource;
}

export class Asset extends BaseProperty {

	@prop({ required: true })
	@IsString()
	assetId!: string; // TODO: add object id validation

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

export type LocalAccountType = DocumentType<ReturnType<typeof UsernamePasswordCredentialsModelSupport> & _LocalAccount>;
