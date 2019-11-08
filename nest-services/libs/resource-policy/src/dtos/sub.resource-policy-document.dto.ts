import { ResourceActionDTO } from './sub.resource-action.dto';
import { Authorization }     from '../protos';
import { Transform }         from 'class-transformer';
import {
	isAnyProtosTypeObject,
	unpackAuthorizationMessage,
} from '../protos/index';
import {
	IsString,
	ArrayUnique,
	ValidateNested,
	IsMongoId,
	ValidationArguments,
	registerDecorator,
	validate,
	IsDefined,
} from 'class-validator';
import { decodeResourcePolicyDocumentType } from '../models';


export type StandardEnum<T> = {
	[id: string]: T | string;
	[nu: number]: string;
}


export function ValueTypedValidate<T extends StandardEnum<number>>
																	(typePropertyName: string,
																	 typeValidators: {[K in keyof T]: Array<Function> }) {
	return function(object: any, propertyName: string) {
		registerDecorator({
			name: 'ValueTypedValidate',
			target: object.constructor.Function,
			propertyName: propertyName,
			constraints: [],
			options: {},
			async: true,
			validator: {
				async validate(value: any, args: ValidationArguments) {
					const { object: validatedObject } = args;
					const validators = typeValidators[(validatedObject as any)[typePropertyName]];
					const validatedObjectCopy = { propertyName: value };
					validators.forEach((validator: Function) => validator(validatedObjectCopy, propertyName));
					const errors = await validate(validatedObjectCopy);
					if (errors.length) {
						args.constraints.push(errors[0].toString());
					}
					return errors.length === 0;
				},
				defaultMessage(args: ValidationArguments) {
					return args.constraints.slice(-1)[0];
				}
			}
		})
	};
}


export class ResourcePolicyDocumentDTO {

	@IsMongoId()
	indentityId!: string;

	@Transform((value: any) => decodeResourcePolicyDocumentType(value))
	@IsDefined()
	policyDocumentType!: string;

	@Transform((value: any) => {
		return isAnyProtosTypeObject(value)
			? unpackAuthorizationMessage(value)
			: value;
	})
	@ValueTypedValidate<typeof Authorization.ResourcePolicyDocumentType>('policyDocumentType', {
		'ACTIONS_LIST': [
			ArrayUnique(),
			ValidateNested({ each: true }),
		],
		'GLYPH_SYMBOL': [
			IsString(),
		],
	})
	value!: Array<ResourceActionDTO> | string;

}
