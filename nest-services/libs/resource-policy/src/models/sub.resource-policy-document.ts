import { prop }          from '@typegoose/typegoose';
import { Authorization } from '../protos';
import {
	GlyphSymbolPolicyDocumentType,
	ActionsListPolicyDocumentType,
} from './sub.resource-policy-document-types';


export type ResourcePolicyDocumentKindType = GlyphSymbolPolicyDocumentType | ActionsListPolicyDocumentType;


const ResourcePolicyDocumentTypeMapper = {
	[Authorization.ResourcePolicyDocumentType.ACTIONS_LIST]: 'ACTIONS_LIST',
	[Authorization.ResourcePolicyDocumentType.GLYPH_SYMBOL]: 'GLYPH_SYMBOL',
} as const;


export function encodeResourcePolicyDocumentType(valueToEncode: string) {
	const targetObject = ResourcePolicyDocumentTypeMapper;
	const foundKey = Object
		.keys(targetObject)
		.find((key: string) => {
			return (targetObject as any)[key] === valueToEncode
		});
	if (!foundKey) {
		throw new Error('Cannot encode resource policy document type');
	}
	return (Authorization.ResourcePolicyDocumentType as any)[foundKey];
}


export function decodeResourcePolicyDocumentType(keyToDecode: string | number) {
	return (ResourcePolicyDocumentTypeMapper as any)[keyToDecode] as undefined | {
		[K in keyof typeof ResourcePolicyDocumentTypeMapper]: typeof ResourcePolicyDocumentTypeMapper[K]
	}[keyof typeof ResourcePolicyDocumentTypeMapper];
}


export class ResourcePolicyDocument {

	@prop({ required: true })
	type!: string; 
	
	@prop({ required: true })
	identityId!: string;

	@prop({ required: true, _id: false })
	kind!: ResourcePolicyDocumentKindType;

}
