import { ResourceIdConstuctor } from './data-types/resource-id';
import {
	PipeTransform,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';


/**
 * Base resourceId validation pipe. Which transforms string value of resource Id into
 * Resource Id instance, that should be created in sub-classes. 
 */
export abstract class ResourceIdParamValidationPipe extends ResourceIdConstuctor implements PipeTransform<string, any> {

	public constructor(public readonly paramName: string) {
		super();
	}

	public transform(resourceIdValue: string, { type, data }: ArgumentMetadata) {

		if (type === 'param' && data === this.paramName) {
			
			// TODO: get error message
			if (this.isValidFormat(resourceIdValue)) {
				throw new BadRequestException('Validation failed. Invalid id format');
			}

			return this.createResourceIdInstance(resourceIdValue);
		}

		throw new Error(`Could not transform resourceId param ${this.paramName}`);
	}

}
