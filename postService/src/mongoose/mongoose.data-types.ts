import mongoose from 'mongoose';
import { IResourceId } from '../base/data-types/resource-id';

export class MongooseResourceId implements IResourceId {

	public constructor(private readonly resourceId: string) {}

	public isValidFormat() {
		return mongoose.Types.ObjectId.isValid(this.resourceId);
	}

	public getResourceId() {
		return this.resourceId;
	}

	public toString() {
		return new mongoose.Types.ObjectId(this.resourceId).toHexString();
	}

}
