import { prop }     from '@typegoose/typegoose';


export class ResourceAction {
	
	@prop({ required: true, unique: true })
	name!: string;

}
