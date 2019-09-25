import mongoose from 'mongoose';
import { UserRepository } from '@app/data-layer/models/User';
import { NotFound, BadRequest } from 'http-errors';
import { Service } from 'typedi';

function isNull(obj: any): obj is null {
	return obj === null && typeof null === 'object';
}

@Service()
export default class UserDataAgent {

	public constructor() { }

	public async getUserById(userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		const result = await UserRepository.findById(userId).exec();
		if (isNull(result)) {
			throw new NotFound('User not found.');
		}
		return result;
	}

	public async createNewUser(user: any) {
		return UserRepository.create(user);
	}

	public async updateUserById(userId: string, newUserData: any) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		const result = await UserRepository.findOneAndUpdate(
			{ _id: userId },
			{ $set: newUserData },
			{ new: true },
		).exec();
		if (isNull(result)) {
			throw new NotFound('User not found.');
		}
		return result;
	}

}
