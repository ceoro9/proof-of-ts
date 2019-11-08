import * as grpc                    from 'grpc';
import * as rxjs                    from 'rxjs';
import ProtoBuf                     from 'protobufjs';
import { plainToClass }             from 'class-transformer';
import { Controller }               from '@nestjs/common';
import { GrpcMethod }               from '@nestjs/microservices';
import { AppService }               from './app.service';
import { packAuthorizationMessage } from '@authorization-service/resource-policy/protos';
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
		const createResourceTypeDTO = plainToClass(CreateResourceTypeDTO, requestData);
		console.log(createResourceTypeDTO);
		console.log('ho');
		const resourceTypePromise   = this.resourcePolicyService.createResourceType(createResourceTypeDTO);
		return rxjs.from(resourceTypePromise);
	}

	@GrpcMethod()
	public createResourceInstance(requestData: Auth.ResourceInstance, _metadata?: grpc.Metadata) {
		const createResourceInstanceDTO = plainToClass(CreateResourceInstanceDTO, requestData);
		const resourceInstancePromise   = this.resourcePolicyService.createResourceInstance(createResourceInstanceDTO);
		return rxjs.from(resourceInstancePromise);
	}

  @GrpcMethod()
  public isActionPermitted(requestData: Auth.IsActionPermittedRequest, _metedata?: grpc.Metadata) {
		return rxjs.of({'result': true} as Auth.IsActionPermittedResponse);
	}
	
	@GrpcMethod()
	public getResourcePolicyByResourceId(requestData: Auth.ResourceById, _metadata?: grpc.Metadata) {
		return rxjs.from(new Promise(async (resolve: (result: Auth.ResourcePolicy) => void ) => {
			const resourceByMongoIdDTO = getResourceByMongoIdDTO(requestData.resourceId);
			const resourcePolicy       = await this.resourcePolicyService.getResourceInstanceById(resourceByMongoIdDTO); 
			resolve({
				documents: resourcePolicy.policy.documents.map((resourcePolicyDocument: ResourcePolicyDocument) => {
					const {
						indentityId,
						type: policyDocumentType,
						kind: value,
					} = resourcePolicyDocument;
					return {
						indentityId,
						policyDocumentType:  encodeResourcePolicyDocumentType(policyDocumentType),
						policyDocumentValue: packAuthorizationMessage(new ProtoBuf.Message({ value })),
					};
				})
			});
		}));
	}

}
