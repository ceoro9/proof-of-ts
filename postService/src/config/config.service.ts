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

		if (typeof obj === "string") {
			this.envConfig = dotenv.parse(fs.readFileSync(obj));
		}
		
		if (typeof obj === "object") {
			this.envConfig = obj;
		}

		if (typeof obj === "undefined") {
			this.envConfig = process.env;
		}

		throw new Error(`Invalid configuration parameter: ${obj}`);
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
