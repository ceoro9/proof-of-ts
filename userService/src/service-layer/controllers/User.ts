import { JsonController, Param, Get, Post, Body } from 'routing-controllers';
import { logger } from '@app/middleware/common/Logging';
import UserDataAgent from '@app/data-layer/data-agents/UserDataAgent';
import UserResponse from '@app/service-layer/responses/UserResponse';
import UserRegisterRequest from '@app/service-layer/requests/UserRegisterRequest';
import UserRegisterRequestValidationSchema from '@app/business-layer/validators/UserRegisterRequestValidationSchema';

@JsonController('/users')
export class UsersController {

  private userDataAgent: UserDataAgent;

	public constructor() {
		this.userDataAgent = new UserDataAgent();
	}

	@Get('/:userId')
	public async getOne(@Param('userId') userId: string) {
    logger.info(`Get user by id: ${userId}`);
    // TODO: catch exceptions
    const result = await this.userDataAgent.getUserById(userId);
    return new UserResponse(result).getDetailed();
  }
  
  @Post('/')
  public async register(@Body() request: UserRegisterRequest) {
    logger.info('Register user');
    const validationErrors = await new UserRegisterRequestValidationSchema(request).validate();
    // TODO: create abstraction to handle incorrect request
    if (validationErrors.length) {
      throw {
        throw: true,
        status: 400,
        message: 'Incorrect input',
        data: validationErrors
      };
    }
    // TODO: catch exceptions
    const result = await this.userDataAgent.createNewUser(request);
    return new UserResponse(result).getSuccessRegistration();
  }

}
