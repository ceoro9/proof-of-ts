import { JsonController, Post, Param  } from 'routing-controllers';
import UserStatusAgent from '@app/data-layer/data-agents/UserStatusAgent';
import UserResponse from '@app/service-layer/responses/UserResponse';
import { logger } from '@app/middleware/common/Logging';

@JsonController('/user-status/:userId')
export class UserStatusController {

	public constructor(private userStatusDataAgent: UserStatusAgent) { }

	@Post('/ban')
	public async banUser(@Param('userId') userId: string) {
		logger.info(`Ban user by id: ${userId}`);
		const updatedUser = await this.userStatusDataAgent.banUserById(userId);
		return new UserResponse(updatedUser).updatedStatus();
	}

	@Post('/delete')
	public async deleteUser(@Param('userId') userId: string) {
		logger.info(`Delete user by id: ${userId}`);
		const updatedUser = await this.userStatusDataAgent.deleteUserById(userId);
		return new UserResponse(updatedUser).updatedStatus();
	}

}
