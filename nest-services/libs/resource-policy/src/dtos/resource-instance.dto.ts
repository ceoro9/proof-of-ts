import { ValidateNested, Validate } from 'class-validator';
import { Type }                     from 'class-transformer';
import { MongooseObjectId }         from '@post-service/posts';
import { ResourcePolicyDTO }        from './sub.resource-policy.dto';


export class CreateResourceInstanceDTO {

	@Validate(MongooseObjectId)
	resourceId!: string;

	@Validate(MongooseObjectId)
	typeId!: string;

	@Validate(MongooseObjectId)
	ownerId!: string;

	@Type(() => ResourcePolicyDTO)
	@ValidateNested()
	policy!: ResourcePolicyDTO;
	
}
