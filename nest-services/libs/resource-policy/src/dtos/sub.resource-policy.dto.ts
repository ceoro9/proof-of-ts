import { ArrayUnique, ValidateNested } from 'class-validator';
import { ResourcePolicyDocumentDTO }   from './sub.resource-policy-document.dto';


export class ResourcePolicyDTO {
	
	@ArrayUnique()
	@ValidateNested({ each: true })
	documents!: Array<ResourcePolicyDocumentDTO>;

}
