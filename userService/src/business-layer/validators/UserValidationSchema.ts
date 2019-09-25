import { IsEmail, Length, MinLength, MaxLength, IsEnum, IsOptional, MetadataStorage } from 'class-validator';
import BaseValidationSchema from './BaseValidationSchema';
import { UserRegisterRequest, UserPatchRequest } from '@app/service-layer/requests/UserRequest';
import { Gender } from '@app/data-layer/constants';

export class UserRegisterRequestValidationSchema extends BaseValidationSchema implements UserRegisterRequest {

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

	public constructor(request: UserRegisterRequest) {
		super();
		// TODO: find a way to avoid such boilerplate code
		this.firstName = request.firstName;
		this.lastName  = request.lastName;
		this.username  = request.username;
		this.email     = request.email;
		this.gender    = request.gender;
	}

}

export class UserPatchRequestValidationSchema extends BaseValidationSchema implements UserPatchRequest {

	@IsOptional()
	@Length(2, 100)
	public firstName?: string;

	@IsOptional()
	@Length(2, 200)
	public lastName?: string;

	@IsOptional()
	@IsEnum(Gender)
	public gender?: string;

	public constructor(request: UserPatchRequest) {
		super();
		// TODO: find a way to avoid such boilerplate code
		this.firstName = request.firstName;
		this.lastName  = request.lastName;
		this.gender    = request.gender;
	}

}
