import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Type, TypeHelpOptions }                      from 'class-transformer';
import { EntitledEntityType, Resource, Asset }        from '../models';

export class CreateLocalAccountDTO {

	@IsString()
	username!: string;

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsDateString()
	expiresAt!: Date;

	@IsEnum(EntitledEntityType)
	entitledEntityType!: string;

	// TODO: Transform
	@Type((type?: TypeHelpOptions) => {
		console.log("ppppppppppppppppppppp", type);
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
