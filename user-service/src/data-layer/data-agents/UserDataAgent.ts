import mongoose from 'mongoose';
import { UserRepository } from '@app/data-layer/models/User';
import { NotFound, BadRequest } from 'http-errors';
import { Service } from 'typedi';
import { isNull } from '@app/utils/TypeGuards';

@Service()
export default class UserDataAgent {

	public constructor() { }

	public async getUserById(userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		const foundUser = await UserRepository.findById(userId).exec();
		if (isNull(foundUser)) {
			throw new NotFound('User not found.');
		}
		return foundUser;
	}

	public createNewUser(user: any) {
		return UserRepository.create(user);
	}

	public async updateUserById(userId: string, newUserData: any) {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			throw new BadRequest('Incorrect user id format.');
		}
		// TODO: change on replaceOne method
		const updatedUser = await UserRepository.findOneAndUpdate(
			{ _id: userId },
			{ $set: newUserData },
			{ new: true },
		).exec();
		if (isNull(updatedUser)) {
			throw new NotFound('User not found.');
		}
		return updatedUser;
	}

}
