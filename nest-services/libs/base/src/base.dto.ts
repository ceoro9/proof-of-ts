import { IResourceId } from './data-types/resource-id';
import {
	validate as validateSchema,
	ValidationError,
} from 'class-validator';

export class BaseDTO {

	protected validationErrors: ValidationError[] | undefined;

	public async validate() {
		if (this.validationErrors === undefined) {
			this.validationErrors = await validateSchema(this);
		}
		return this.validationErrors;
	}
}

export abstract class BaseModelDTO extends BaseDTO {

	protected abstract createResourceIdInstance(resourceIdValue: string): IResourceId;
}
