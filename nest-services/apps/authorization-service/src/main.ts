import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


export const authorizationServiceOptions = {
	transport: Transport.GRPC,
	options: {
		url: 'localhost:5000', 
		package: 'Authorization',
		protoPath: '/home/ceoro9/ts_practive/proof-of-ts/nest-services/apps/authorization-service/protos/authorization.proto',
	}
};


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, authorizationServiceOptions);
  await app.listenAsync();
}
bootstrap();
