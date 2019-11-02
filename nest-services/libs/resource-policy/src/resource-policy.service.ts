import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel }                     from 'nestjs-typegoose';
import { validate }                        from 'class-validator';
import { ReturnModelType }                 from '@typegoose/typegoose';
import { ResourceType, ResourceInstance }  from './models';
import { IResourceId }                     from '@post-service/base';


@Injectable()
export class ResourcePolicyService {

	public constructor(
		@InjectModel(ResourceType) private readonly resourceTypeModel: ReturnModelType<typeof ResourceType>,
		@InjectModel(ResourceInstance) private readonly resourceInstanceModel: ReturnModelType<typeof ResourceInstance>
	) {}

	public async createResourceType(instance: ResourceType) {
		const errors = await validate(instance);
		if (errors.length) {
			throw new BadRequestException('Invalid payload');  // TODO
		}
		return this.resourceTypeModel.create(instance);
	}

	public async createResourceInstance(instance: ResourceInstance) {
		const errors = await validate(instance);
		if (errors.length) {
			throw new BadRequestException('Invalid payload');  // TODO
		}
	}

	public async getResourceInstanceById(resourceInstanceId: IResourceId) {
		const resourceInstance = await this.resourceInstanceModel.findById(resourceInstanceId).exec();
		if (!resourceInstance) {
			throw new NotFoundException('Resource instance was not found.');
		}
		return resourceInstance;
	}

}
