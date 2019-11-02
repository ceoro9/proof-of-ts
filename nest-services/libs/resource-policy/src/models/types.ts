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

export type ListModelKeysType<ModelType> = Omit<ListKeysType<ModelType>, '_id' | 'id'>;


