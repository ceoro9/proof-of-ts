import { Validate }         from 'class-validator';
import { plainToClass }     from 'class-transformer';
import { MongooseObjectId } from '@post-service/posts';


export class ExtractResourceByMongoIdDTO {

	@Validate(MongooseObjectId)
	value!: string;

}


export function getResourceByMongoIdDTO(resourceId: any) {
	return plainToClass(ExtractResourceByMongoIdDTO, { value: resourceId });
}
