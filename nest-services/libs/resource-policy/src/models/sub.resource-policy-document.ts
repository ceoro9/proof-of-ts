import { prop, Ref }                         from '@typegoose/typegoose';
import { IsString, ValidateNested, IsEnum  } from 'class-validator';
import {
	ResourcePolicyDocumentType,
	GlyphSymbolPolicyDocumentType,
	ActionsListPolicyDocumentType,
} from './sub.resource-policy-document-types';


export class ResourcePolicyDocument {

	@IsEnum(ResourcePolicyDocumentType)
	@prop({ required: true, enum: ResourcePolicyDocumentType })
	type!: ResourcePolicyDocumentType; 
	
	@IsString()
	@prop({ required: true })
	indentityId!: string;

	@prop({ required: true, refPath: 'type' })
	@ValidateNested()
	kind!: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>;
	
}

/**
 * TODO: refactor this 2 type guards, but to keep type safeness
 */

export function isGlyphSymbolPolicyDocumentType
		(kind: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>): kind is GlyphSymbolPolicyDocumentType {
	return !!(kind as any).value;
}


export function isActionsListPolicyDocumentType
		(kind: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>): kind is ActionsListPolicyDocumentType {
	return !!(kind as any).items;
}


