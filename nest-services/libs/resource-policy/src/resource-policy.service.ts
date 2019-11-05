import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel }                                        from 'nestjs-typegoose';
import { validate }                        									  from 'class-validator';
import { plainToClass }                    										from 'class-transformer';
import { ReturnModelType }                 										from '@typegoose/typegoose';
import { IResourceId }                     										from '@post-service/base';
import { ResourceType, ResourceInstance }  										from './models';
import { CreateResourceTypeDTO, CreateResourceInstanceDTO }   from './dtos';


@Injectable()
export class ResourcePolicyService {

	public constructor(
		@InjectModel(ResourceType) private readonly resourceTypeModel: ReturnModelType<typeof ResourceType>,
		@InjectModel(ResourceInstance) private readonly resourceInstanceModel: ReturnModelType<typeof ResourceInstance>
	) {}

	public async createResourceType(createResourceTypeDTO: CreateResourceTypeDTO) {
		const errors = await validate(createResourceTypeDTO);
		console.log(errors);
		if (errors.length) {
			throw new BadRequestException('Invalid payload');
		}
		return this.resourceTypeModel.create(createResourceTypeDTO);
	}

	public async createResourceInstance(createResourceInstanceDTO: CreateResourceInstanceDTO) {
		const errors = await validate(createResourceInstanceDTO);
		console.log(errors);
		if (errors.length) {
			throw new BadRequestException('Invalid payload');
		}
		return this.resourceInstanceModel.create(createResourceInstanceDTO);
	}

	public async getResourceInstanceById(resourceInstanceId: IResourceId) {
		const resourceInstance = await this.resourceInstanceModel.findById(resourceInstanceId).exec();
		if (!resourceInstance) {
			throw new NotFoundException('Resource instance was not found');
		}
		return resourceInstance;
	}

}
