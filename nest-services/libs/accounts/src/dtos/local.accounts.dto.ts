import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Type, TypeHelpOptions }                from 'class-transformer';
import { EntitledEntityType, Resource, Asset }  from '../models';

export class LocalAccountCreateDTO {

	@IsString()
	username!: string;

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsDate()
	expiresAt!: Date;

	@IsEnum(EntitledEntityType)
	entitledEntityType!: string;

	@Type((type?: TypeHelpOptions) => {
		const { newObject } = type!;

		switch (newObject.entitledEntityType) {

			case EntitledEntityType.Resource:
				return Resource;

			case EntitledEntityType.Asset:
				return Asset;
			
			default:
				throw new Error(
					`Unable to resolve entitled entity type: ${newObject.entitledEntityType}`
				);
		}
	})
	entitledEntity!: Resource | Asset;
	
}
