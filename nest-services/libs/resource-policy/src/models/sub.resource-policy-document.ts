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
