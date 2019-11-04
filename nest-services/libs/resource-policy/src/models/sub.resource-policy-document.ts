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

	public isGlyphSymbolPolicy() {
		return this.type === ResourcePolicyDocumentType.GLYPH_SYMBOL;
	}

	public isActionsListPolicy() {
		return this.type === ResourcePolicyDocumentType.ACTIONS_LIST;
	}

	public static narrowPolicyTypeValue(obj: ResourcePolicyDocument) {

		const isGlyphSymbolPolicy = (_kind: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>): _kind is GlyphSymbolPolicyDocumentType => {
			return obj.isGlyphSymbolPolicy();
		};

		const isActionsListPolicy = (_kind: Ref<GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType>): _kind is ActionsListPolicyDocumentType => {
			return obj.isActionsListPolicy();
		};

		return { isGlyphSymbolPolicy, isActionsListPolicy };
	}
	
}
