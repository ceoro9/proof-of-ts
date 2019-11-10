import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel }                                        from 'nestjs-typegoose';
import { validate }                        									  from 'class-validator';
import { ReturnModelType }                 										from '@typegoose/typegoose';
import { ResourceType, ResourceInstance }  										from './models';
import {
	CreateResourceTypeDTO,
	CreateResourceInstanceDTO,
	ResourcePolicyDocumentDTO,
	ExtractResourceByMongoIdDTO,
} from './dtos';


@Injectable()
export class ResourcePolicyService {

	public constructor(
		@InjectModel(ResourceType) private readonly resourceTypeModel: ReturnModelType<typeof ResourceType>,
		@InjectModel(ResourceInstance) private readonly resourceInstanceModel: ReturnModelType<typeof ResourceInstance>
	) {}

	public async createResourceType(createResourceTypeDTO: CreateResourceTypeDTO) {
		const errors = await validate(createResourceTypeDTO);
		if (errors.length) {
			throw new Error('Invalid payload');
		}
		return this.resourceTypeModel.create(createResourceTypeDTO);
	}

	public async createResourceInstance(createResourceInstanceDTO: CreateResourceInstanceDTO) {
		console.log(createResourceInstanceDTO.policy.documents);
		const errors = await validate(createResourceInstanceDTO);
		if (errors.length) {
			throw new Error('Invalid payload');
		}
		const { resourceId, ownerId, typeId, policy } = createResourceInstanceDTO;
		return this.resourceInstanceModel.create({
			resourceId,
			ownerId,
			typeId,
			policy: {
				documents: policy.documents.map((rpDTO: ResourcePolicyDocumentDTO) => {
					const { identityId, policyDocumentType, policyDocumentValue } = rpDTO;
					return {
						identityId,
						type: policyDocumentType,
						kind: policyDocumentValue.getKind(),
					};
				})
			}
		});
	}

	public async getResourceInstanceById(resourceInstanceId: ExtractResourceByMongoIdDTO) {
		const errors = await validate(resourceInstanceId);
		if (errors.length) {
			throw new Error('Invalid resource id format');
		}
		const resourceInstance = await this.resourceInstanceModel.findById(resourceInstanceId.value).exec();
		if (!resourceInstance) {
			throw new Error('Resource instance was not found');
		}
		return resourceInstance;
	}

}
