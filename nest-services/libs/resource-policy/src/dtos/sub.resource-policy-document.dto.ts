import { ResourceActionDTO }                from './sub.resource-action.dto';
import { Authorization }                    from '../protos';
import { MongooseObjectId }                 from '@post-service/posts';
import { Transform, Type, TypeHelpOptions, plainToClass }             from 'class-transformer';
import { IsString, ArrayUnique, ValidateNested, Validate, IsDefined } from 'class-validator';
import {
	decodeResourcePolicyDocumentType,
	GlyphSymbolPolicyDocumentType,
	ActionsListPolicyDocumentType,
} from '../models';




abstract class BaseResourcePolicyDocumentTypeDTO {

	public abstract getKind(): any;

}


export class GlyphResourcePolicyDocumentTypeDTO extends BaseResourcePolicyDocumentTypeDTO {

	@IsString()
	symbol!: string;

	public getKind() {
		return plainToClass(GlyphSymbolPolicyDocumentType, this);
	}

}


export class ActionsListResourcePolicyDocumentTypeDTO extends BaseResourcePolicyDocumentTypeDTO {

	@ArrayUnique()
	@ValidateNested({ each: true })
	actions!: Array<ResourceActionDTO>;

	public getKind() {
		return plainToClass(ActionsListPolicyDocumentType, this);
	}

}


const resourcePolicyDocumentTypeDTOMapper = {
	'ACTIONS_LIST': GlyphResourcePolicyDocumentTypeDTO,
	'GLYPH_SYMBOL': ActionsListResourcePolicyDocumentTypeDTO,
} as const;


export class ResourcePolicyDocumentDTO {

	@Validate(MongooseObjectId)
	identityId!: string;

	@Transform((value: string) => {
		return decodeResourcePolicyDocumentType(value);
	})
	@IsDefined()
	policyDocumentType!: string;

	@Type((type?: TypeHelpOptions) => {
		if (type) {
			const { object } = type;
			const policyDocumentType = decodeResourcePolicyDocumentType((object as any).policyDocumentType);
			const resultType = policyDocumentType ? resourcePolicyDocumentTypeDTOMapper[policyDocumentType] : void 0;
			if (!resultType) {
				throw new Error('Cannot decode policy document type');
			}
			return resultType;
		}
		throw new Error('Cannot find type information');
	})
	@Transform((value: Authorization.AnyJson, obj: any) => {
		if (value.jsonSerializedValue) {
			const result = JSON.parse(value.jsonSerializedValue);
			return plainToClass((value as any).constructor, result);
		}
	})
	@IsDefined()
	@ValidateNested({ each: true })
	policyDocumentValue!: GlyphResourcePolicyDocumentTypeDTO | ActionsListResourcePolicyDocumentTypeDTO;

}
