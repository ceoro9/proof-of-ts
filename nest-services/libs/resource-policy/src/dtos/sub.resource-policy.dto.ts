import { ArrayUnique, ValidateNested } from 'class-validator';
import { ResourcePolicyDocument }      from './sub.resource-policy-document.dto';


export class ResourcePolicy {
	
	@ArrayUnique()
	@ValidateNested({ each: true })
	documents!: Array<ResourcePolicyDocument>;

}
