import { Injectable, BadRequestException }  from '@nestjs/common';
import { IResourceId } from './data-types/resource-id';
import {registerDecorator, IsDefined, ValidationArguments} from "class-validator";
import { Transform } from 'class-transformer';
import { composeDecorators } from './utils';

export type DoesResourceExistTypeService<T> = {

	findById(resourceId: IResourceId): Promise<NonNullable<T> | null>;

	getResourceName(): string;

};

export type ResourceIdFieldConstructor<T extends IResourceId> = {

	/**
	 * Creates new resourceId object
	 */
	new(value: string): T;

}

export function ResourceIdField<T, E>(doesResourceExistTypeService: DoesResourceExistTypeService<T>,
												        			resourceIdFieldConstuctor: ResourceIdFieldConstructor<E>) {
	return composeDecorators([
		IsDefined(),
		DoesResourceExist(doesResourceExistTypeService),
		Transform((value: unknown) => {
			if (typeof value === 'string') {
				return new resourceIdFieldConstuctor(value)
			}
			throw new BadRequestException('Wrong format');
		}),
	])
}


export function DoesResourceExist<T>(doesResourceExistTypeService: DoesResourceExistTypeService<T>) {
	
	return function (object: Object, propertyName: string) {
		
		registerDecorator({
				name: 'DoesResourceExist',
				target: object.constructor,
				propertyName: propertyName,
				validator: {

					async validate(resourceId: IResourceId, _args: ValidationArguments) {
						const resource = await doesResourceExistTypeService.findById(resourceId);
						return !!resource;
					},

					defaultMessage(args: ValidationArguments) {
						const resourceName = doesResourceExistTypeService.getResourceName();
						return `Resource '${resourceName}' with id '${args.value}' does not exist`;
					}

				}
		});

	};
}
