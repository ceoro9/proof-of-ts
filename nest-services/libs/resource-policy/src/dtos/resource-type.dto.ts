import { IsString, Length, ArrayUnique, ValidateNested } from 'class-validator';
import { ResourceAction } from './sub.resource-action.dto';


export class CreateResourceTypeDTO {
	
	@IsString()
	@Length(2, 100)
	name!: string;

	@ArrayUnique()
	@ValidateNested({ each: true })
	availableActions!: Array<ResourceAction>;

}
