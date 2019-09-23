import * as mongoose from 'mongoose';
import { prop, Typegoose, ModelType, staticMethod, pre, post } from 'typegoose';
import validator from 'validator';
import { Gender, Privilige } from '../constants';

@pre<UserModel>('save', function(next) {
	if (this.gender === Gender.NON_BINARY) {
		this.privilege = Privilige.HIGH;
	}
	next();
})
@post<UserModel>('save', user => {
	try {
		console.log('user has saved ...');
		// TODO: add queue event
	} catch (e) {
		// TODO: log error
	}
})
export class UserModel extends Typegoose {

	@prop({ required: true, trim: true })
	public firstName!: string;

	@prop({ required: true, trim: true })
	public lastName!: string;

	@prop({ required: true, unique: true, trim: true })
	public username!: string;

	@prop({
		required: true,
		validate: [
			{
				validator: validator.isEmail,
				message: `{VALUE} is not a valid email`,
			},
		],
	})
	public email!: string;

	@prop({ required: true, enum: Gender })
	public gender!: Gender;

	@prop({ enum: Privilige, default: Privilige.LOW })
	public privilege!: Privilige;

	@prop()
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	set fullName(full) {
		const [firstName, lastName] = full.split(' ');
		this.firstName = firstName;
		this.lastName = lastName;
	}

	@staticMethod
	public static findByFullName(this: ModelType<UserModel> & typeof UserModel, fullName: string) {
		const [firstName, lastName] = fullName.split(' ');

		return this.findOne({ firstName, lastName });
	}

}

// TODO: may be move to separate file
export const UserRepository = new UserModel().getModelForClass(UserModel, {
	existingMongoose: mongoose,
	schemaOptions: {
		collection: 'users',
	},
});

