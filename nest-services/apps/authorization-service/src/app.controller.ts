import * as grpc                    from 'grpc';
import * as rxjs                    from 'rxjs';
import { plainToClass }             from 'class-transformer';
import { Controller }               from '@nestjs/common';
import { GrpcMethod }               from '@nestjs/microservices';
import { AppService }               from './app.service';
import {
	Authorization as Auth,
	ResourcePolicyService,	
	ResourcePolicyDocument,
	CreateResourceTypeDTO,
	CreateResourceInstanceDTO,
	getResourceByMongoIdDTO,
	encodeResourcePolicyDocumentType,
} from '@authorization-service/resource-policy';


@Controller()
export class ResourcePermissionsService implements Auth.ResourcePermissionsService {
	
	public constructor(private readonly appService: AppService,
							       private readonly resourcePolicyService: ResourcePolicyService) {}

	@GrpcMethod()
	public createResourceType(requestData: Auth.ResourceType, _metadata?: grpc.Metadata) {
		return rxjs.from(new Promise(async (resolve: (result: Auth.ResourceType) => void) => {
			const createResourceTypeDTO = plainToClass(CreateResourceTypeDTO, requestData);
			const resourceType = await this.resourcePolicyService.createResourceType(createResourceTypeDTO);
			resolve(resourceType); // TODO: create DTO to convert to proto response type
		}));
	}

	@GrpcMethod()
	public createResourceInstance(requestData: Auth.ResourceInstance, _metadata?: grpc.Metadata) {
		return rxjs.from(new Promise(async (resolve: (result: Auth.ResourceInstance) => void) => {
			const createResourceInstanceDTO = plainToClass(CreateResourceInstanceDTO, requestData);
			const resourceInstance = await this.resourcePolicyService.createResourceInstance(createResourceInstanceDTO);
			resolve({
				...resourceInstance,
				typeId: resourceInstance.typeId.toString(),
				policy: {
					documents: resourceInstance.policy.documents.map((resourcePolicyDocument: ResourcePolicyDocument) => {
						const {
							identityId,
							type: policyDocumentType,
							kind: value,
						} = resourcePolicyDocument;
						return {
							identityId,
							policyDocumentType:  encodeResourcePolicyDocumentType(policyDocumentType),
							policyDocumentValue: {
								jsonSerializedValue: JSON.stringify(value),
							},
						};
					})
				}
			});
		}));
	}

  @GrpcMethod()
  public isActionPermitted(requestData: Auth.IsActionPermittedRequest, _metedata?: grpc.Metadata) {
		return rxjs.of({'result': false} as Auth.IsActionPermittedResponse);
	}
	
	@GrpcMethod()
	public getResourcePolicyByResourceId(requestData: Auth.ResourceById, _metadata?: grpc.Metadata) {
		return rxjs.from(new Promise(async (resolve: (result: Auth.ResourcePolicy) => void) => {
			const resourceByMongoIdDTO = getResourceByMongoIdDTO(requestData.resourceId);
			const resourceInstance = await this.resourcePolicyService.getResourceInstanceById(resourceByMongoIdDTO); 
			resolve({
				documents: resourceInstance.policy.documents.map((resourcePolicyDocument: ResourcePolicyDocument) => {
					const {
						identityId,
						type: policyDocumentType,
						kind: value,
					} = resourcePolicyDocument;
					return {
						identityId,
						policyDocumentType:  encodeResourcePolicyDocumentType(policyDocumentType),
						policyDocumentValue: {
							jsonSerializedValue: JSON.stringify(value),
						},	
					};
				})
			});
		}));
	}

}
