import { validate as validateSchema } from 'class-validator';
import { IResourceId } from './data-types/resource-id';


export class BaseDTO {

	protected isValid: boolean | undefined;

	public async validate() {
		const validationErrors = await validateSchema(this);
		console.log(validationErrors);
		this.isValid = validationErrors.length === 0;
		return validationErrors;
	}

}


export abstract class BaseModelDTO extends BaseDTO {

	protected abstract createResourceIdInstance(resourceIdValue: string): IResourceId;

}
