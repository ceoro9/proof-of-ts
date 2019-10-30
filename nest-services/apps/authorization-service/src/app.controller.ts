import * as grpc                 from 'grpc';
import { Controller }            from '@nestjs/common';
import { GrpcMethod }            from '@nestjs/microservices';
import { AppService }            from './app.service';
import { Authorization as Auth } from './generated/authorization-grpc-namespaces'
import { BaseGrpcException }     from './app.exception';


@Controller()
export class ResourcePolicyService {
	
	constructor(private readonly appService: AppService) {}

  @GrpcMethod()
  public doesUserHasPermission(requestData: Auth.DoesUserHasPermissionRequest, metedata?: grpc.Metadata) {
		return {'result': true} as Auth.DoesUserHasPermissionResponse;
	}
	
	@GrpcMethod()
	public getResourcePolicyById(requestData: Auth.GetResourcePolicyByIdRequest, metadata?: grpc.Metadata) {
		throw new BaseGrpcException(grpc.status.INTERNAL, 'invalida input');
	}

}
