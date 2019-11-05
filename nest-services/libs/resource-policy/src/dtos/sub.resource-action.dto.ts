import { IsString, Length } from 'class-validator';


export class ResourceActionDTO {
	
	@IsString()
	@Length(2, 100)
	name!: string;

}
