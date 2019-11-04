import { IsString, Length } from 'class-validator';


export class ResourceAction {
	
	@IsString()
	@Length(2, 100)
	name!: string;

}
