import { prop, arrayProp } from '@typegoose/typegoose';
import { ResourceAction }  from './sub.resource-action';


export enum ResourcePolicyDocumentType {
	GLYPH_SYMBOL = 'GlyphSymbolPolicyDocumentType',
	ACTIONS_LIST = 'ActionsListPolicyDocumentType',
}


export class GlyphSymbolPolicyDocumentType {

	@prop({ required: true })
	value!: string;

}


export class ActionsListPolicyDocumentType {

	@arrayProp({ required: true, items: ResourceAction, _id: false })
	actions!: Array<ResourceAction>;

}
