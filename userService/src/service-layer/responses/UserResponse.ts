import { UserModel } from '@app/data-layer/models/User';

export default class UserResponse {

	public constructor(private user: UserModel) { }

	public detailed() {
		const { firstName, lastName, username, gender } = this.user;
		return {
			firstName,
			lastName,
			username,
			gender,
		};
	}

	public afterRegistration() {
		const { privilege } = this.user;
		return {
			...this.detailed(),
			privilege,
		};
	}

}
