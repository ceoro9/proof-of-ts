import { prop, Ref } from '@typegoose/typegoose';
import {
	ResourcePolicyDocumentType,
	GlyphSymbolPolicyDocumentType,
	ActionsListPolicyDocumentType,
} from './sub.resource-policy-document-types';


export type ResourcePolicyDocumentKindType = GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType;


export class ResourcePolicyDocument {

	@prop({ required: true, enum: ResourcePolicyDocumentType, _id: false })
	type!: ResourcePolicyDocumentType; 
	
	@prop({ required: true })
	indentityId!: string;

	@prop({ required: true, refPath: 'type', _id: false })
	kind!: ResourcePolicyDocumentKindType;

	public getGlyphSymbol() {
		if (this.type === ResourcePolicyDocumentType.GLYPH_SYMBOL) {
			return (this.kind as GlyphSymbolPolicyDocumentType).value;
		}
		return null;
	}

	public getActions() {
		if (this.type === ResourcePolicyDocumentType.ACTIONS_LIST) {
			return (this.kind as ActionsListPolicyDocumentType).actions;
		}
		return null;
	}

}
