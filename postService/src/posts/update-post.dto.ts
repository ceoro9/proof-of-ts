import { Length }           from 'class-validator';
import { MongooseModelDTO } from '../mongoose/mongoose.dto';


export class UpdatePostDTO extends MongooseModelDTO {
	
	@Length(5, 100)
	readonly title?: string;
	
	@Length(5, 5000)
	readonly text?: string;

}
