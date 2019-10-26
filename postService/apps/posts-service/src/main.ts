import { NestFactory }  from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule }    from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// make class-validator to use NestJS container
	useContainer(app.select(AppModule), { fallbackOnErrors: true, fallback: true });
	app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
