import { ArrayUnique, ValidateNested } from 'class-validator';
import { Type }                        from 'class-transformer';
import { ResourcePolicyDocumentDTO }   from './sub.resource-policy-document.dto';


export class ResourcePolicyDTO {
	
	@Type(() => ResourcePolicyDocumentDTO)
	@ArrayUnique()
	@ValidateNested({ each: true })
	documents!: Array<ResourcePolicyDocumentDTO>;

}
