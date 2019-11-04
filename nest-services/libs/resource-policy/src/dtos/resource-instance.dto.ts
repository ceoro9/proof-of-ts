import { ValidateNested, IsMongoId } from 'class-validator';
import { ResourcePolicy }            from './sub.resource-policy.dto';

export class ResourceInstance {

	@IsMongoId()
	resourceId!: string;

	@IsMongoId()
	typeId!: string;

	@IsMongoId()
	ownerId!: string;

	@ValidateNested()
	policy!: ResourcePolicy;
	
}



export class CreateResourceInstanceDTO {
	
}
