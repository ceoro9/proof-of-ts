import { ResourceActionDTO } from './sub.resource-action.dto';
import {
	IsString,
	Length,
	ArrayUnique,
	ValidateNested,
} from 'class-validator';


export class CreateResourceTypeDTO {
	
	@IsString()
	@Length(2, 100)
	name!: string;

	@ArrayUnique()
	@ValidateNested({ each: true })
	availableActions!: Array<ResourceActionDTO>;

}
