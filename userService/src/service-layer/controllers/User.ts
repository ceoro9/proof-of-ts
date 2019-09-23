import { JsonController, Param, Get, Post, Body, Patch } from 'routing-controllers';
import { logger } from '@app/middleware/common/Logging';
import UserDataAgent from '@app/data-layer/data-agents/UserDataAgent';
import UserResponse from '@app/service-layer/responses/UserResponse';
import {
	UserRegisterRequest,
	UserPatchRequest,
} from '@app/service-layer/requests/UserRequest';
import {
	UserRegisterRequestValidationSchema,
	UserPatchRequestValidationSchema,
} from '@app/business-layer/validators/UserValidationSchema';

@JsonController('/users')
export class UsersController {

	private userDataAgent: UserDataAgent;

	public constructor() {
		this.userDataAgent = new UserDataAgent();
	}

	@Get('/:userId')
	public async getOne(@Param('userId') userId: string) {
		logger.info(`Get user by id: ${userId}`);
		const result = await this.userDataAgent.getUserById(userId);
		return new UserResponse(result).detailed();
	}

	@Post('/')
	public async register(@Body() request: UserRegisterRequest) {
		logger.info('Register user');
		await new UserRegisterRequestValidationSchema(request).validate();
		const result = await this.userDataAgent.createNewUser(request);
		return new UserResponse(result).afterRegistration();
	}

	@Patch('/:userId')
	public async update(@Param('userId') userId: string, @Body() request: UserPatchRequest) {
		logger.info('Patch user');
		await new UserPatchRequestValidationSchema(request).validate();
		const result = await this.userDataAgent.updateUserById(userId, request);
		return new UserResponse(result).detailed();
	}

}
