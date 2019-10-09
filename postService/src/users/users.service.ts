import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { UserServiceResponse, UserSuccessResponseType } from "./users.response";

@Injectable()
export class UserService {

	public constructor(private configService: ConfigService) {}

	private processResponse(response: UserServiceResponse) {

		if (UserServiceResponse.isError(response)) {
			throw response.getResult();
		}

		if (UserServiceResponse.isSuccess(response)) {
			return response.getResult() as UserSuccessResponseType; // TODO: fix
		}

		throw new Error('Unknow user service response.');

	}

	public async getUserById(userId: string) {
		const userServiceUrl = this.configService.getStrict('USER_SERVICE_URL');
		const response = await fetch(userServiceUrl + userId)
		const userServiceResponse = await UserServiceResponse.createFromHttpResponse(response);
		return this.processResponse(userServiceResponse);
	}

	public async doesUserExist(userId: string) {
		try {
			this.getUserById(userId);
			return true;
		} catch (e) {
			return false;
		}
	}

}
