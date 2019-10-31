import { prop, arrayProp }                   from '@typegoose/typegoose';
import { IsString, ValidateNested, IsArray } from 'class-validator';
import { ResourceAction }                    from './sub.resource-action';


export enum ResourcePolicyDocumentType {
	GLYPH_SYMBOL = 'GlyphSymbolPolicyDocumentType',
	ACTIONS_LIST = 'ActionsListPolicyDocumentType',
}


export class GlyphSymbolPolicyDocumentType {

	@IsString()
	@prop({ required: true })
	value!: string;

}


export class ActionsListPolicyDocumentType {

	@IsArray()
	@ValidateNested({ each: true })
	@arrayProp({ required: true, items: ResourceAction, _id: false })
	actions!: Array<ResourceAction>;

}
