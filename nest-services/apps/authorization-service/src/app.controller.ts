import * as grpc                 from 'grpc';
import * as rxjs                 from 'rxjs';
import { Controller }            from '@nestjs/common';
import { GrpcMethod }            from '@nestjs/microservices';
import { ResourcePolicyService, ResourceInstance, ResourcePolicyDocument, ResourcePolicyDocumentType } from '@authorization-service/resource-policy';
import { AppService }            from './app.service';
import { Authorization as Auth } from './generated/authorization-grpc-namespaces';
import { BaseGrpcException } from './app.exception';



@Controller()
export class ResourcePermissionsService implements Auth.ResourcePermissionsService {
	
	public constructor(private readonly appService: AppService,
							       private readonly resourcePolicyService: ResourcePolicyService) {}

	@GrpcMethod()
	public createResourceType(requestData: Auth.ResourceType, metadata?: grpc.Metadata) {
		const resourceTypePromise = this.resourcePolicyService.createResourceType(requestData);
		return rxjs.from(resourceTypePromise);
	}

	@GrpcMethod()
	public createResourceInstance(requestData: Auth.ResourceInstance, metadata?: grpc.Metadata) {
		// TODO:
		const resourcePolicyDocuments = requestData.policy && requestData.policy.documents
			? requestData.policy.documents.map((document: Auth.ResourcePolicyDocument) => {

					

					const resultDocument: ResourcePolicyDocument = {
						indentityId: document.identityId,
						kind: document.actions ? { value: document.actions } : document.actionsGlyph,
						type: document.actions ? ResourcePolicyDocumentType.ACTIONS_LIST : ResourcePolicyDocumentType.GLYPH_SYMBOL,
					};
				
					if (document.actions && document.actionsGlyph) {
						throw new BaseGrpcException(grpc.status.INTERNAL, 'Actions list and glyph cannot be specified simultaneously');
					}

					if (document.actions) {

					}
					
				})
			: undefined;

		const resourceInstancePromise = this.resourcePolicyService.createResourceInstance({
			...requestData,
			policy: {
				...requestData.policy,
				documents: resourcePolicyDocuments,
			}
		});
		return rxjs.from(resourceInstancePromise);
	}

  @GrpcMethod()
  public isActionPermitted(requestData: Auth.IsActionPermittedRequest, metedata?: grpc.Metadata) {
		return rxjs.of({'result': true} as Auth.IsActionPermittedResponse);
	}
	
	@GrpcMethod()
	public getResourcePolicyByResourceId(requestData: Auth.ResourceById, metadata?: grpc.Metadata) {
		const resourceInstancePromise = this.resourcePolicyService.getResourceInstanceById(requestData.resourceId!);
		return rxjs.from(resourceInstancePromise.then((resourceInstance: ResourceInstance) => ({
			
			documents: resourceInstance.policy.documents.map((resourcePolicyDocument: ResourcePolicyDocument) => {

				const narrowPolicyTypeValue= ResourcePolicyDocument.narrowPolicyTypeValue(resourcePolicyDocument);

				const getActionsGlyphField = () => {
					return narrowPolicyTypeValue.isGlyphSymbolPolicy(resourcePolicyDocument.kind) ? resourcePolicyDocument.kind.value : null;
				};

				const getActionstsField = () => {
					return narrowPolicyTypeValue.isActionsListPolicy(resourcePolicyDocument.kind) ? resourcePolicyDocument.kind.actions : null;
				};

				const result: Required<Auth.ResourcePolicyDocument> = {
					identityId:    resourcePolicyDocument.indentityId,
					actionsGlyph:  getActionsGlyphField(),
					actions:       getActionstsField(),
				};

				return result;
			})

		})));
	}

}
