import { IsMongoId }    from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IResourceId }  from '@post-service/base';


export class ExtractResourceByMongoIdDTO {

	@IsMongoId()
	value!: string;

}


export function getResourceByMongoIdDTO(resourceId: any) {
	return plainToClass(ExtractResourceByMongoIdDTO, { value: resourceId });
}
