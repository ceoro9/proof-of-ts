import { IsEmail, Length, MinLength, MaxLength, IsEnum, IsOptional, MetadataStorage } from 'class-validator';
import BaseValidationSchema from './BaseValidationSchema';
import { UserRegisterRequest, UserPatchRequest } from '@app/service-layer/requests/UserRequest';
import { Gender } from '@app/data-layer/constants';

export class UserRegisterRequestValidationSchema extends BaseValidationSchema implements UserRegisterRequest {

	@Length(2, 100)
	public firstName!: string;

	@Length(2, 200)
	public lastName!: string;

	@MinLength(2, { message: 'Username is too short' })
	@MaxLength(80, { message: 'Username is too long' })
	public username!: string;

	@IsEmail()
	public email!: string;

	@IsEnum(Gender)
	public gender!: string;

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

}
