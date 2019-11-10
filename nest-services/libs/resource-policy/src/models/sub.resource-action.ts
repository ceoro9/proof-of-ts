import { prop } from '@typegoose/typegoose';


export class ResourceAction {
	
	@prop({ required: true })
	name!: string;

}
