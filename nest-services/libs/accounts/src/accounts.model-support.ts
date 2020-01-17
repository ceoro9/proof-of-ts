import { prop } from '@typegoose/typegoose';
import { IsString, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Constructor type
 */
type Constructable<T = {}> = new(...args: any[]) => T;


/**
 * Readonly interface to access username/password credentials type
 */
export interface ReadonlyUsernamePasswordCredentials {
	getUsername(): string;
	getPassword(): string;
}

/**
 * RW interface to work with username/password credentials type
 */
export interface UsernamePasswordCrendentialsModelType extends ReadonlyUsernamePasswordCredentials {  // TODO: rename interface
	setUsername(usernameValue: string): void;
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

export class UsernamePasswordCredentialsDTO {

	// TODO: add custom validators
	@IsString()	
	username!: string;

	// TODO: add custom validators
	@IsString()
	password!: string;
}

/**
 * Adds support of username/password credentials to model
 * @param baseAccountCtor 
 */
export function UsernamePasswordCredentialsDtoSupport<BC extends Constructable>(baseAccountCtor: BC) {

	class ResultMixedClass extends baseAccountCtor implements ReadonlyUsernamePasswordCredentials {

		@ValidateNested()
		@IsDefined()
		@Type(() => UsernamePasswordCredentialsDTO)
		public __usernamePasswordData!: UsernamePasswordCredentialsDTO;

		public getUsername() {
			return this.__usernamePasswordData.username;
		}

		public getPassword() {
			return this.__usernamePasswordData.password;
		}
	}

	return ResultMixedClass;
}

/**
 * Adds support of username/password credentials to model
 * @param baseAccountCtor
 */
export function UsernamePasswordCredentialsModelSupport<BC extends Constructable>(baseAccountCtor: BC) {

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
