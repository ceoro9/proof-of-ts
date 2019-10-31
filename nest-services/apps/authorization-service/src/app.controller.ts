import * as grpc                 from 'grpc';
import * as rxjs                 from 'rxjs';
import { Controller }            from '@nestjs/common';
import { GrpcMethod }            from '@nestjs/microservices';
import { AppService }            from './app.service';
import { Authorization as Auth } from './generated/authorization-grpc-namespaces'
// import { BaseGrpcException }     from './app.exception';

@Controller()
export class ResourcePermissionsService implements Auth.ResourcePermissionsService {
	
	constructor(private readonly appService: AppService) {}

  @GrpcMethod()
  public isActionPermitted(requestData: Auth.IsActionPermittedRequest, metedata?: grpc.Metadata) {
		// const error = {
		// 	code: grpc.status.INTERNAL,
		// 	details: 'nice',
		// 	metadata: null,
		// };
		
		// if (Array.isArray(status.details)) {
		// 	const metadata = new grpc.Metadata();
		// 	status.details.forEach((detail, i) => {
		// 		if (i) {
		// 			metadata.add('detail-bin', Buffer.from(JSON.stringify(detail)));
		// 		} else {
		// 			metadata.set('detail-bin', Buffer.from(JSON.stringify(detail)));
		// 		}
		// 	});
		// 	error.metadata = metadata;
		// }
		
		// // Send the error status message to the client
		// call(error);
		return rxjs.of({'result': true} as Auth.IsActionPermittedRequestResponse);
	}
	
	@GrpcMethod()
	public getResourcePolicyByResourceId(requestData: Auth.ResourceById, metadata?: grpc.Metadata) {
		// throw new BaseGrpcException(grpc.status.INTERNAL, 'invalida input');
		return rxjs.of({'result': true} as Auth.ResourceById);
	}

}
