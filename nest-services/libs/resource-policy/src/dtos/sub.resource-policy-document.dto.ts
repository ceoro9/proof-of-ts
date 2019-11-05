import { ResourceActionDTO } from './sub.resource-action.dto';
import {
	IsString,
	ArrayUnique,
	ValidateNested,
	IsMongoId,
	ValidationArguments,
	ValidateIf,
	Validate,
	ValidatorConstraintInterface,
} from 'class-validator';


export function IsOneDefinedFrom(fieldsToCheck: Array<string>, constraints: Array<Function>) {

	return function(target: any, propertyKey: string) {
		const decorators: Array<Function> = [
			Validate(IsOneDefinedFromFieldsValidation, fieldsToCheck),
			ValidateIf((o: any) => !!o[propertyKey]),
			...constraints,
		];
		decorators.forEach((d: Function) => d(target, propertyKey));
	}
}


export class IsOneDefinedFromFieldsValidation implements ValidatorConstraintInterface {

	public validate(value: any, args: ValidationArguments) {
		const { object: targetObject } = args;
		const [ fieldsToCheck ] = args.constraints;
		const allOthersAreUndefined = fieldsToCheck.every((fieldName: string) => !(targetObject as any)[fieldName]);
		const oneOfOthersIsDefined  = fieldsToCheck.filter((fieldName: string) => !!(targetObject as any)[fieldName]).length === 1;
		return (!!value && allOthersAreUndefined) || (!value && oneOfOthersIsDefined);
	}

	public defaultMessage(args: ValidationArguments) {
		const { targetName }    = args;
		const [ fieldsToCheck ] = args.constraints;
		return `Only one of '${[targetName, ...fieldsToCheck].join(',')}' fields have to be defined`;
	}

}


export class ResourcePolicyDocumentDTO {

	@IsMongoId()
	indentityId!: string;

	@IsOneDefinedFrom(['actions'], [
		IsString(),
	])
	actionsGlyph?: string;

	@IsOneDefinedFrom(['actionsGlyph'], [
		ArrayUnique(),
		ValidateNested({ each: true }),
	])
	actions?: Array<ResourceActionDTO>;

}
