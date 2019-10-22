import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
	
	private readonly envConfig: { [key: string]: string | undefined } = process.env;

	public constructor();
	public constructor(filePath: string);
	public constructor(configObject: { [key: string]: string | undefined });
	public constructor(obj?: string | { [key: string]: string | undefined }) {

		switch (typeof obj) {

			case "string": {
				this.envConfig = dotenv.parse(fs.readFileSync(obj));				
				break;
			}

			case "object": {
				this.envConfig = obj;
				break;
			}

			case "undefined": {
				this.envConfig = process.env;
				break;
			}

			default: {
				throw new Error(`Invalid configuration parameter: ${obj}`);
			}
		}
	
	}

	public get(key: string) {
		return this.envConfig[key];
	}

	public getStrict(key: string) {
		const value = this.envConfig[key];
		if (!value) {
			throw new Error(`No ${key} parameter in configuration.`);
		}
		return value;
	}

}
