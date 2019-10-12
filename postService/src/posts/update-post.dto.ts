import { BaseDTO } from './create-post.dto';
import { Length }  from 'class-validator';

export class UpdatePostDTO extends BaseDTO {
	
	@Length(5, 100)
	readonly title?: string;
	
	@Length(5, 5000)
	readonly text?: string;

}
