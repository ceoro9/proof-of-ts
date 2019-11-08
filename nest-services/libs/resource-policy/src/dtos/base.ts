import { IsMongoId }    from 'class-validator';
import { plainToClass } from 'class-transformer';


export class ExtractResourceByMongoIdDTO {

	@IsMongoId()
	value!: string;

}


export function getResourceByMongoIdDTO(resourceId: any) {
	return plainToClass(ExtractResourceByMongoIdDTO, { value: resourceId });
}
