import { ValidateNested, IsMongoId } from 'class-validator';
import { ResourcePolicyDTO }         from './sub.resource-policy.dto';


export class CreateResourceInstanceDTO {

	@IsMongoId()
	resourceId!: string;

	@IsMongoId()
	typeId!: string;

	@IsMongoId()
	ownerId!: string;

	@ValidateNested()
	policy!: ResourcePolicyDTO;
	
}
