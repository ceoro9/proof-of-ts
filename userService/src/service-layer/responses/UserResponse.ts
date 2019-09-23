import { UserModel } from '@app/data-layer/models/User';

export default class UserResponse {

	public constructor(private user: UserModel) { }

	public getDetailed() {
		const { firstName, lastName, username } = this.user;
		return {
			firstName,
			lastName,
			username,
		};
	}

	public getSuccessRegistration() {
		const { privilege } = this.user;
		return {
			...this.getDetailed(),
			privilege,
		};
	}

}
