import { IsEmail, Length, MinLength, MaxLength, IsEnum } from 'class-validator';
import BaseValidationSchema from './BaseValidationSchema';
import UserRegisterRequest from '@app/service-layer/requests/UserRegisterRequest';
import { Gender } from '@app/data-layer/constants';

class UserRegisterRequestValidationSchema extends BaseValidationSchema implements UserRegisterRequest {

	@Length(2, 100)
	public firstName: string;

	@Length(2, 200)
	public lastName: string;

	@MinLength(2, { message: 'Username is too short' })
	@MaxLength(80, { message: 'Username is too long' })
	public username: string;

	@IsEmail()
	public email: string;

	@IsEnum(Gender)
	public gender: string;

	constructor(request: UserRegisterRequest) {
		super();
		// TODO: find a way to avoid such boilerplate code
		this.firstName = request.firstName;
		this.lastName  = request.lastName;
		this.username  = request.username;
		this.email     = request.email;
		this.gender    = request.gender;
	}

}

export default UserRegisterRequestValidationSchema;
