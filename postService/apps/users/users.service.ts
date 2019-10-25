import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UserServiceResponse, UserSuccessResponseType, UserErrorResponseType } from './users.response';

@Injectable()
export class UserService {

	public constructor(private configService: ConfigService) {}

	private processUserServiceResponse(response: UserServiceResponse) {

		if (UserServiceResponse.isError(response)) {
			throw response.toHttpException();
		}

		if (UserServiceResponse.isSuccess(response)) {
			return response.getResult() as UserSuccessResponseType; // TODO: fix
		}

		throw new Error('Unknown user service response');
	}

	public async getUserById(userId: string) {
		const userServiceUrl = this.configService.getStrict('USER_SERVICE_URL');
		const response = await fetch(`${userServiceUrl}/users/${userId}`);
		const userServiceResponse = await UserServiceResponse.createFromHttpResponse(response);
		return this.processUserServiceResponse(userServiceResponse);
	}

	public async doesUserExist(userId: string) {
		try {
			await this.getUserById(userId);
			return true;
		} catch (e) {
			return false;
		}
	}

}
