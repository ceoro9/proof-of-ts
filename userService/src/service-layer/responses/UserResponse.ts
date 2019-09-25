import { UserModel } from '@app/data-layer/models/User';

export default class UserResponse {

	public constructor(private user: UserModel) { }

	public detailed() {
		const { id, firstName, lastName, username, gender, status } = this.user;
		return {
			id,
			firstName,
			lastName,
			username,
			gender,
			status,
		};
	}

	public afterRegistration() {
		const { privilege } = this.user;
		return {
			...this.detailed(),
			privilege,
		};
	}

	public updatedStatus() {
		// TODO: add timestamp data
		const { id, status } = this.user;
		return {
			id,
			status,
		}
	}

}
