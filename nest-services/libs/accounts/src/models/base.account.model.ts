import { Schema } from 'mongoose';
import { prop }   from '@typegoose/typegoose';

export abstract class BaseAccount {
	
	_id!: Schema.Types.ObjectId;

	createdAt!: Date;
	updatedAt!: Date;

	@prop({})
	firstName!: string;

	@prop({})
	lastName!: string;
}
