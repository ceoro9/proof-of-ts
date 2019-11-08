import { ResourceActionDTO } from './sub.resource-action.dto';
import {
	IsString,
	Length,
	ArrayUnique,
	ValidateNested,
	IsArray,
} from 'class-validator';


export class CreateResourceTypeDTO {
	
	@IsString()
	@Length(2, 100)
	name!: string;

	// @IsArray()
	// @ArrayUnique()
	// @ValidateNested({ each: true })
	availableActions!: Array<ResourceActionDTO>;

}
