import { prop }     from '@typegoose/typegoose';
import { IsString } from 'class-validator';


export class ResourceAction {
	
	@IsString()
	@prop({ required: true, unique: true })
	name!: string;

}
