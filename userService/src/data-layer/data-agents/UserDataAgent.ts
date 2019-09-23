import mongoose from 'mongoose';
import { UserRepository } from '@app/data-layer/models/User';

function isNull(obj: any): obj is null {
  return obj === null && typeof null == "object";
}

export default class UserDataAgent {

  public constructor() { }

  public async getUserById(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Incorrect user id');
    }
    const result = await UserRepository.findById(userId).exec();
    if (isNull(result)) {
      throw new Error('Not found.');
    }
    return result;
  }

  public async createNewUser(user: any) {
    return UserRepository.create(user);
  }

}