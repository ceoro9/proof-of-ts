import {
	ResourceType,
	ResourceInstance,
	ResourceAction,
	ResourcePolicy,
	ResourcePolicyDocument,
} from '.';


export type ResourceTypeObject = ListModelKeysType<ResourceType>;

export type ResourceInstanceObject = ListModelKeysType<ResourceInstance>;

export type ResourceActionObject = ListModelKeysType<ResourceAction>;

export type ResourcePolicyDocumentObject = ListModelKeysType<ResourcePolicyDocument>;

export type ResourcePolicyObject = ListModelKeysType<ResourcePolicy>;

/**
 * 
 */

export type ListKeysType<T> = {
	[K in keyof T]: T[K]
};

export type RecursivePartialAndNullable<T> = {
	[P in keyof T]?: RecursivePartialAndNullable<T[P]> | null;
};

export type ListModelKeysType<ModelType> = RecursivePartialAndNullable<Omit<ListKeysType<ModelType>, '_id' | 'id'>>;


