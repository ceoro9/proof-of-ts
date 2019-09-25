import mongoose from 'mongoose';
import { NotFound, BadRequest } from 'http-errors';
import { UserRepository } from '@app/data-layer/models/User';
import { UserStatus } from '@app/data-layer/constants';

function isNull(obj: any): obj is null {
	return obj === null && typeof null === 'object';
}

export default class UserStatusAgent {

	public constructor() { }

	public async banUserById(userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		const updatedUser = await UserRepository.findByIdAndUpdate(
			userId,
			{
				$set: {
					status: UserStatus.BANNED
				}
			},
			{ new: true }
		);
		if (isNull(updatedUser)) {
			throw new NotFound('User not found.');
		}
		return updatedUser;
	}

	public async deleteUserById(userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		const updatedUser = await UserRepository.findByIdAndUpdate(
			userId,
			{
				$set: {
					status: UserStatus.DELETED
				}
			},
			{ new: true }
		);
		if (isNull(updatedUser)) {
			throw new NotFound('User not found.');
		}
		return updatedUser;
	}

}
