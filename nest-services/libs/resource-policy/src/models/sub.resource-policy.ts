import { arrayProp }              from '@typegoose/typegoose';
import { ResourcePolicyDocument } from './sub.resource-policy-document';


export class ResourcePolicy {
	
	@arrayProp({ required: true, items: ResourcePolicyDocument, _id: false })
	documents!: Array<ResourcePolicyDocument>;

}
