import { prop } from '@typegoose/typegoose';

/**
 * Constructor type
 */
type Constructable<T = {}> = new(...args: any[]) => T;

/**
 * Interface to work with model, that supports
 * username/password credentials type
 */
export interface UsernamePasswordCrendentialsModelType {

	// Username methods
	getUsername(): string;
	setUsername(usernameValue: string): void;

	// Password methods
	getPassword(): string;
	setPassword(passwordValue: string): void;
}

/**
 * Data stored in database to support
 * username/password credentials type
 */
export class SourceAccountModelMixin {

	@prop({ required: true, unique: true })
	public username!: string;

	@prop({ required: true })
	public passoword!: string;
}

/**
 * Adds support of username/password credentials to model
 * @param baseAccountCtor
 */
export function applyMixin<BC extends Constructable>(baseAccountCtor: BC) {

	class ResultMixedClass extends baseAccountCtor implements UsernamePasswordCrendentialsModelType {

		@prop({ required: true, _id: false })
		public __usernamePasswordData!: SourceAccountModelMixin;

		public getUsername() {
			return this.__usernamePasswordData.username;
		}

		public setUsername(usernameValue: string) {
			this.__usernamePasswordData.username = usernameValue;
		}

		public getPassword() {
			return this.__usernamePasswordData.passoword;
		}

		public setPassword(passwordValue: string) {
			this.__usernamePasswordData.passoword = passwordValue;
		}
	}

	return ResultMixedClass;
}
