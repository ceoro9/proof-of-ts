import { prop, Ref } from '@typegoose/typegoose';
import {
	ResourcePolicyDocumentType,
	GlyphSymbolPolicyDocumentType,
	ActionsListPolicyDocumentType,
} from './sub.resource-policy-document-types';


export class ResourcePolicyDocument {

	@prop({ required: true, enum: ResourcePolicyDocumentType, _id: false })
	type!: ResourcePolicyDocumentType; 
	
	@prop({ required: true })
	indentityId!: string;

	@prop({ required: true, refPath: 'type' })
	kind!: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>;

}
