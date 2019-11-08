import { prop, arrayProp }                from '@typegoose/typegoose';
import { ResourceAction }                 from './sub.resource-action';


export class GlyphSymbolPolicyDocumentType {

	@prop({ required: true })
	value!: string;

}


export class ActionsListPolicyDocumentType {

	@arrayProp({ required: true, items: ResourceAction, _id: false })
	actions!: Array<ResourceAction>;

}
