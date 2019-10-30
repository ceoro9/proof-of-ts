import * as grpc from 'grpc';
import { Controller }            from '@nestjs/common';
import { GrpcMethod, RpcException }            from '@nestjs/microservices';
import { AppService }            from './app.service';
import { Authorization as Auth } from './generated/authorization-grpc-namespaces'


export class BaseGrpcException extends RpcException {

	public constructor(code: grpc.status, message: string) {
		super({ code, message });
	}

}


@Controller()
export class ResourcePolicyService {
	
	constructor(private readonly appService: AppService) {}

  @GrpcMethod()
  public doesUserHasPermission(requestData: Auth.DoesUserHasPermissionRequest, metedata?: grpc.Metadata) {
		console.log('llo', requestData);
		return {'result': true} as Auth.DoesUserHasPermissionResponse;
	}
	
	@GrpcMethod()
	public getResourcePolicyById(requestData: Auth.GetResourcePolicyByIdRequest, metadata?: grpc.Metadata) {
		throw new BaseGrpcException(grpc.status.INTERNAL, 'invalida input');
		// return {
		// 	'resourceId': '4242424',
		// 	'resourceType': 'test',
		// } as Auth.ResourcePolicy;
	}

}
