import winston from 'winston';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WinstonLoggerService {

	public getConfig(): winston.LoggerOptions | undefined {
		return {
			level: 'info',
			format: winston.format.json(),
			defaultMeta: this.getMetadata(),
			transports: this.getTransports(),
		};
	}

	private getTransports() {
		return [
			new winston.transports.Console({
				format: winston.format.simple(),
			}),
		];
	}

	private getMetadata() {
		return {
			service: 'post-service',
		};
	}

}

