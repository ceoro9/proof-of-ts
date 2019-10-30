import * as grpc from 'grpc'; 
import { RpcException } from '@nestjs/microservices';


export class BaseGrpcException extends RpcException {

	public constructor(code: grpc.status, message: string) {
		super({ code, message });
	}

}
	